const https = require('https')
const fs = require('fs');
const path = require('path');
const Koa = require('koa')
const Router = require('koa-router');
const multer = require('koa-multer');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const router = new Router();

let WebSocketServer = require('ws').Server;
let WebSocket = require('ws');
const { log } = require('console');


const app = new Koa();
app.use(cors())
// 添加 bodyparser 中间件
app.use(bodyParser());

const server = https.createServer(
  {
    key: fs.readFileSync(__dirname + '/keys/localhost.key', 'utf-8'),
    cert: fs.readFileSync(__dirname + '/keys/localhost.crt', 'utf-8')
  },
  app.callback()
);
// const httpsServerws = https.createServer(server, app);
const wss = new WebSocketServer({ server: server });
// 用来保存客户端
let clients = [];
wss.on('connection', (ws, req) => {
  console.log('新连接');
	let url = req.url;
	let clientId = ''
	if (url) {
		let spit = url.split('/')
    clientId = spit[3];
		console.log(clientId);
		ws.clientId = clientId
		clients.push(clientId)
	}
	console.log(clients);
  // 处理收到的消息
  ws.on('message', (message) => {
    // console.log(`接受到用户的数据: ${message}`);
		let data = JSON.parse(message);
		if (data.type === 'heartbeat') return;
		let toUserId = data.toUserId;
		if (data.message === undefined) {
			return;
		}
		log(data.message.type);
		switch (data.message.type) {
			case 'connect':
				console.log('connect');
				broadcast(data, toUserId);
				break;
			case 'start':
				console.log('start', toUserId);
				broadcast(data, toUserId);
				break;
			case 'offer':
				console.log('offer', toUserId);
				broadcast(data, toUserId);
				break;
			case 'answer':
				console.log('answer', toUserId);
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
			case 'reject':
				broadcast(data, toUserId);
				break;
			case 'denyAuthorization':
				log(data, toUserId);
				broadcast(data, toUserId);
				break;
			default:
				break;
		}
  });

  // 处理连接关闭
  ws.on('close', () => {
		let index = clients.findIndex(id => clientId === id);
    clients.splice(index, 1);
    console.log('Client disconnected');
		console.log(clientId + '连接断开');
  });
});


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
    if (client.readyState === WebSocket.OPEN && client.clientId === toUserId) {
      send(client, msg);
    }
  });
}


const PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 19120;


server.listen(HTTPS_PORT, function() {
  console.log('HTTPS Server is running on: https://localhost:%s', HTTPS_PORT);
});

app.use(router.routes());
app.use(router.allowedMethods());


app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});

// 配置 multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // 设置文件存储位置
  },
  filename: function (req, file, cb) {
    const fileFormat = (file.originalname).split(".");
    cb(null, file.originalname); // 设置文件名
  }
});

const upload = multer({ storage: storage });


router.post('/api/file/upload', upload.single('file'), async (ctx, next) => {
  ctx.body = {
    filename: ctx.req.file.filename // 返回文件名
  }
})

const localChunks = [];
const remoteChunks = [];

router.post('/formdata/sustain', async (ctx, next) => {
	const data = ctx.request.body;
	// const fields = ctx.req.body; // 获取其他字段
	log(data);
	// if (ctx.req.body.source === 'local') {
	// 	localChunks.push(chunk.buffer);
	// }
	// if (ctx.req.body.source === 'remote') {
	// 	remoteChunks.push(chunk.buffer);
	// }
	// if (data.source === 'local') {
	// 	localChunks.push(data.file);
	// 	log(localChunks);
	// }
	// if (data.source === 'remote') {
	// 	remoteChunks.push(data.file);
	// }
	// console.log(fields);
  ctx.body = {
    status: 'success',
    message: 'Data received successfully'
  }
});

router.post('/upload/end', async (ctx, next) => {
	const data = ctx.request.body;
	if (data.source === 'local') {
		log(localChunks);
		const videoBuffer = Buffer.concat([...localChunks]);
		// 写入硬盘
		fs.writeFile(path.join(__dirname + '/video', 'output.mp4'), videoBuffer, (err) => {
			if (err) throw err;
			console.log('The video has been saved!');
			ctx.body = {
				status: 'success',
				message: 'The video has been saved!'
			}
		});
	}
});

