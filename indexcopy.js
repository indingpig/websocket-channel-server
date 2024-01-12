const path = require('path');
const fs = require('fs');
const http = require('http')
const https = require('https')
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // 使用 multer 处理文件上传
let WebSocketServer = require('ws').Server;
let WebSocket = require('ws')
const { log } = require('console');
const keyPath = fs.readFileSync(path.resolve(__dirname + '/keys') + '/key.key');
const crtPath = fs.readFileSync(path.resolve(__dirname + '/keys') + '/cert.crt');

const credentials = {key: keyPath, cert: crtPath};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './static/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
const app = express();
// app.use(upload.any())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())
// app.use(bodyParser.raw({ type: 'video/webm', limit: '100mb' }));
app.use(cors())
const httpsServerws = https.createServer(credentials, app);
const httpsServer = https.createServer(credentials, app);

let wss = new WebSocketServer({ server: httpsServerws });

httpsServerws.listen(19110, function() {
  console.log('HTTPS Server is running on: https://localhost:%s', 19110);
});

httpsServer.listen(19123, function() {
  console.log('HTTPS Server is running on: https://localhost:%s', 19123);
});


let count = 0;
const room = {};
// 用来保存客户端
let clients = [];
wss.on('connection', (connect, req) => {
  console.log('新连接');
  let url = req.url;
  let client = '';
  if (url) {
    let spit = url.split('/')
    client = Number(spit[3]);
    let roomId = spit[2]
    clients.push(Number(spit[3]));
    if (!room[roomId]) {
      room[roomId] = [client]
    }
    room[roomId].push(client)
  }
  log(room);
  // 将客户id绑定在对应的ws上
  connect.userName = client;
  //用户传来数据，触发text事件
  connect.on('message', (message) => {
      console.log(`接受到用户的数据: ${message}`);
      let data = JSON.parse(message);
      let userId = data.userId;
      let toUserId = data.toUserId;
      log(data);
      switch (data.message.type) {
        case 'connect':
          broadcast(data, toUserId);
          break;
        case 'start':
          broadcast(data, toUserId);
          break;
        case 'offer':
          broadcast(data, toUserId);
          break;
        case 'answer':
          broadcast(data, toUserId);
          break;
        case 'icecandidate':
          if (data.message.icecandidate) {
            broadcast(data);
          }
          break;
        case 'stop':
          broadcast(data, toUserId);
          break;
        default:
          break;
      }
      //接受到数据后给用户响应数据
  });
  //连接关闭触发close事件
  connect.on('close',(res)=>{
    let index = clients.findIndex(id => client === id);
    clients.splice(index, 1);
    log(clients);
    console.log('连接断开');
    count--;
      // broadcast(`${connect.userName}离开了聊天室`)
  });
  //注册error事件,用户端口后就会触发该异常
  connect.on('error',()=>{
    let index = clients.findIndex(id => client === id);
    clients.splice(index, 1);
    log(clients);
    console.log('用户连接异常');
  });
})
const send = (ws, data) => { // 向客户端发送消息
  ws.send(JSON.stringify(data));
}

const broadcast = (msg, toUserId) => {
  if (!toUserId) {
    wss.clients.forEach(client => {
      if (!toUserId) {
        send(client, msg);
      }
    });
    return;
  }
  //server.connection表示所有的用户
  wss.clients.forEach(client => {
    if (!toUserId) {
      send(client, msg);
    }
    if (client.readyState === WebSocket.OPEN && client.userName == toUserId) {
      send(client, msg);
    }
  });
}
// POST 请求处理程序，用于接收视频流
app.post('/api/uploadVideo', upload.any(), (req, res) => {
  try {
      // 获取请求体中的视频数据
      // const videoData = req.body;

      // // 生成唯一的文件名，或者根据需要自定义文件名
      // const fileName = path.resolve(__dirname + `/video_${Date.now()}.webm`);

      // // 将视频数据写入文件
      // fs.writeFile(fileName, videoData, (err) => {
      //     if (err) {
      //         console.error('保存视频文件时出错:', err);
      //         res.status(500).send('保存视频文件时出错');
      //     } else {
      //         console.log('视频文件保存成功:', fileName);
      //       }
      //     });
      // var file = req.file;
      // // var extname = req.files[0].originalname;
      // // var newPath = req.files[0].path + extname;
      // var oldfliepath = path.join(__dirname,"upload",file[0].filename)
      // var newfilepath = path.join(__dirname,"upload",file[0].originalname)
      // fs.rename(oldfliepath, newfilepath, function(err){
      //   if(err){
      //     res.send('上传失败')
      //   }else{
      //   }
      // })
      res.status(200).send('视频文件保存成功');
  } catch (error) {
      console.error('处理视频上传时出错:', error);
      res.status(500).send('处理视频上传时出错');
  }
});
app.get('/api/uploadVideo', (req, res) => {
  try {
    res.status(200).send('视频文件保存成功');
  } catch (error) {
      console.error('处理视频上传时出错:', error);
      res.status(500).send('处理视频上传时出错');
  }
});
app.listen(9000, () => {
  console.log('Server is running on: https://localhost:%s', 9000);
})
// app.use("/echo-protocol", wsServer);