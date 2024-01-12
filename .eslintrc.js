// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    // parser: 'babel-eslint',
    "sourceType": "module"
  },
  env: {
    browser: true,
    "commonjs": true,
    "es6": true,
    "jquery": true
  },
  extends: [
    'standard'
  ],
  // required to lint *.vue files
  // plugins: [
  //   'vue'
  // ],
  // add your custom rules here
  rules: {
    //"off" 或 0：关闭规则
    //"warn" 或 1：开启规则，作为警告
    //"error" 或 2：开启规则，作为错误
    // 禁用 alert、confirm、prompt、console、debugger      
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //箭头前后必须有空格
    "arrow-spacing": [2, { before: true, after: true }],
    // 要求在对象字面量中使用一致的空格
    "object-curly-spacing": 0,
    // 使用 2 个空格缩进
    'indent': ['error', 2, { "SwitchCase": 1 }],
    // 使用单引号
    'quotes': ['error', 'single'],
    //空格进行缩进
    'no-mixed-spaces-and-tabs': 'error',
    // 禁止使用分号
    'semi': ['error', 'always'],
    // 强制分号前后的间距一致
    "semi-spacing": [2, { before: false, after: true }],
    // 要求在代码块前使用空格
    "space-before-blocks": [0, "always"],
    // 要求在函数参数的括号前不使用空格
    "space-before-function-paren": [2, "never"],
    // 要求在括号内不使用空格
    "space-in-parens": [2, "never"],
    // 要求在操作符周围使用空格
    "space-infix-ops": 2,
    // 要求在一元操作符前后使用空格
    "space-unary-ops": [2, { words: true, nonwords: false }],
    // 要求在注释前使用空格
    "spaced-comment": ['error', 'always', { markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] }],
    // 对象字面量的键值之间使用空格
    'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }],
    "keyword-spacing": [2, { before: true, after: true }],
    // 禁止在条件语句中出现赋值操作符
    'no-cond-assign': 2,
    // 禁止在循环中使用await
    'no-await-in-loop': 1,
    // 禁止在条件中使用常量表达式
    'no-constant-condition': 'error',
    // 禁止出现多个空格
    'no-multi-spaces': 'error',
    // 禁止出现多行空行
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    // 禁止在 return、throw、continue 和 break 语句后出现不可达代码
    'no-unreachable': 'error',
    // 禁止在正则表达式中使用控制字符
    'no-control-regex': 'error',
    // 禁止在函数参数中出现重复命名的参数
    'no-dupe-args': 'error',
    // 强制使用 === 和 !==
    'eqeqeq': 'warn',
    // 代码块的花括号周围必须有空格
    "block-spacing": [2, "always"],
    //if else 缩进风格 1tbs
    "brace-style": [2, "1tbs", { allowSingleLine: true }],
    // 变量和函数名必须符合驼峰命名法
    "camelcase": 0,
    // 禁止在对象和数组字面量的最后一个元素后加上逗号
    "comma-dangle": ['error', 'never'],
    // 禁止逗号前后有空格
    "comma-spacing": ['error', { before: false, after: true }],
    // 逗号放置在当前行的末尾
    "comma-style": [2, "last"],
    // 检查派生类的构造函数中是否正确使用了 super
    "constructor-super": 2,
    // 在控制语句中多行要求使用花括号
    "curly": [2, "multi-line"],
    // 要求点号操作符与对象名在同一行
    'dot-location': 0,
    // 要求在生成器函数的 * 前后都有一个空格
    'generator-star-spacing': ['error', 'both'],
    // 要求始终处理回调函数中的错误参数
    'handle-callback-err': 'error',
    // 要求构造函数使用大写字母开头的命名约定
    "new-cap": [2, { newIsCap: true, capIsNew: false }],
    // 禁止使用 arguments.caller 和 arguments.callee
    "no-caller": 2,
    // 禁止对类名重新赋值
    "no-class-assign": 2,
    // 禁止对 const 声明的变量进行重新赋值
    "no-const-assign": 2,
    // 禁止在 case 或 default 子句中使用词法声明
    "no-case-declarations": 0,
    // 禁止在类中重复定义成员
    "no-dupe-class-members": 2,
    // 禁止对象字面量中出现重复的键名
    "no-dupe-keys": 2,
    // 禁止在 switch 语句中出现重复的 case 标签
    "no-duplicate-case": 2,
    // 禁止空的正则表达式字符类
    "no-empty-character-class": 2,
    // 禁止空的解构模式
    "no-empty-pattern": 2,
    //禁止空函数
    "no-empty-function": 2,
    //禁止使用== 和 != 与null进行比较
    "no-eq-null": 2,
    // 禁止对异常对象进行赋值
    "no-ex-assign": 2,
    //检测多余的分号
    "no-extra-semi": 2,
    // 禁止不必要的括号，但在函数表达式周围允许使用括号
    "no-extra-parens": [2, "functions"],
    // 禁止 switch 语句中的 case 子句穿透
    "no-fallthrough": 2,
    // 禁止省略浮点数中的零
    "no-floating-decimal": 2,
    // 禁止对函数声明进行赋值
    "no-func-assign": 2,
    // 禁止在嵌套的语句块中声明函数或变量，但允许在函数中声明函数
    "no-inner-declarations": [2, "functions"],
    // 禁止使用无效的正则表达式
    "no-invalid-regexp": 2,
    // 禁止使用不规则的空白符
    "no-irregular-whitespace": 2,
    // 禁止将变量名作为标签名使用
    "no-label-var": 2,
    // 禁止混合使用空格和制表符进行缩进
    "no-mixed-spaces-and-tabs": 2,
    // 禁止在 in 表达式中使用否定操作符
    "no-negated-in-lhs": 2,
    // 禁止使用 Object 构造函数创建对象
    "no-new-object": 2,
    // 禁止使用 new 操作符调用 require 函数
    "no-new-require": 2,
    // 禁止使用 Symbol 构造函数创建符号
    "no-new-symbol": 2,
    // 禁止使用 String、Number 和 Boolean 构造函数创建字符串、数字和布尔值
    "no-new-wrappers": 2,
    // 禁止将全局对象当作函数调用
    "no-obj-calls": 2,
    // 禁止使用 __dirname 和 __filename 的值与字符串进行拼接
    "no-path-concat": 2,
    // 禁止使用 __proto__ 属性
    "no-proto": 2,
    // 禁止重复声明变量
    "no-redeclare": 2,
    //禁止自我比较
    "no-self-compare": 2,
    // 禁止正则表达式中的多个连续空格
    "no-regex-spaces": 2,
    // 禁止在返回语句中使用赋值语句，除非使用括号将赋值语句括起来
    "no-return-assign": [2, "except-parens"],
    // 禁止将变量赋值给自身
    "no-self-assign": ["error", { "props": true }],
    // 禁止在函数作用域中使用受限制的名称
    "no-shadow-restricted-names": 2,
    // 禁止函数调用时函数名和括号之间有空格
    "no-spaced-func": 2,
    // 禁止稀疏数组
    "no-sparse-arrays": 2,
    // 禁止在调用 super() 之前使用 this 关键字
    "no-this-before-super": 2,
    // 禁止行末尾的空格
    "no-trailing-spaces": 2,
    // 禁止使用未声明的变量如果是全局变量在顶部加 /* global 变量名称 */
    "no-undef": 'error',
    // 禁止使用未使用的变量
    'no-unused-vars': 'error',
    //禁止未使用的标签
    "no-unused-labels": 'error',
    //检测使用eval函数
    "no-eval": 'error',
    //检测使用var声明变量，推荐使用let或const
    "no-var": 'error',
    // 禁止将变量初始化为 undefined
    "no-undef-init": 2,
    // 禁止使用令人困惑的多行表达式
    "no-unexpected-multiline": 2,
    // 禁止在循环条件中使用不会被修改的变量
    "no-unmodified-loop-condition": 2,
    // 禁止不必要的三元表达式
    "no-unneeded-ternary": [2, { defaultAssignment: false }],
    // 禁止在 finally 语句块中使用 return、throw、break 或 continue 等语句
    "no-unsafe-finally": 2,
    // 禁止不必要的 call() 和 apply() 方法调用
    "no-useless-call": 2,
    // 禁止不必要的转义字符
    "no-useless-escape": 0,
    // 禁止属性前的空白
    "no-whitespace-before-property": 2,
    // 要求在模板字符串中不使用空格
    "template-curly-spacing": [2, "never"],
    // 要求使用 isNaN() 函数来检查 NaN
    "use-isnan": 2,
    // 要求使用有效的 typeof 比较值
    "valid-typeof": 2,
    // 要求立即调用的函数表达式使用括号包裹
    "wrap-iife": [2, "any"],
    // 要求在 yield* 表达式中使用一致的空格
    "yield-star-spacing": [2, "both"],
    // 要求在条件语句中，变量与字面量的顺序一致
    'yoda': ['error', 'never'],
    // 要求在数组字面量中使用一致的空格
    "array-bracket-spacing": [2, "never"],
    //回调函数必须包含返回语句
    "array-callback-return": ["error", { allowImplicit: true }],
    //回调函数中不允许使用隐式类型转换
    "no-implicit-coercion": 2,
    //规则要求在数组字面量中的每个元素之间使用换行符进行分隔
    "array-bracket-newline": 0,
    //忽略没有副作用的函数返回值时
    "no-unused-expressions": "error",
    //检测使用in运算符时的错误使用情
    "no-prototype-builtins": "error",
    //要求在多行三元表达式中换行
    "multiline-ternary": 0,
  }
}
