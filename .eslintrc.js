module.exports = {
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: 'eslint:recommended',
  rules: {
    // Possible Errors
    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': 2,
    // 可以使用console
    'no-console': 0,
    // 正则可以使用控制字符
    'no-control-regex': 0,
    // 开发可以使用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': 2,
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止在正则表达式中使用空字符集
    'no-empty-character-class': 2,
    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 2,
    // 禁止不必要的布尔转换
    'no-extra-boolean-cast': 2,
    // 禁止函数周围不必要的括号
    'no-extra-parens': [2, 'functions'],
    // 禁止不必要的分号
    'no-extra-semi': 2,
    // 禁止对 function 声明重新赋值
    'no-func-assign': 2,
    // 禁止在嵌套的块中出现 function 声明
    'no-inner-declarations': [2, 'functions'],
    // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'no-invalid-regexp': 2,
    // 禁止在字符串和注释之外不规则的空白
    'no-irregular-whitespace': 2,
    // 禁止把全局对象作为函数调用
    'no-obj-calls': 2,
    // 禁止正则表达式字面量中出现多个空格
    'no-regex-spaces': 2,
    // 禁止使用稀疏数组，也就是逗号之前没有任何元素的数组
    'no-sparse-arrays': 2,
    // 禁止出现令人困惑的多行表达式
    'no-unexpected-multiline': 2,
    // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 2,
    // 禁止在 finally 语句块中出现控制流语句
    'no-unsafe-finally': 2,
    // 要求使用 isNaN() 检查 NaN
    'use-isnan': 2,
    // 强制 typeof 表达式与有效的字符串进行比较
    'valid-typeof': 2,

    // Best Practices
    // 强制 getter 和 setter 在对象中成对出现
    'accessor-pairs': 2,
    // if、else if、else、for、while 和 do允许在单行中省略大括号，在其他使用中依然会强制使用大括号
    'curly': [2, 'multi-line'],
    // 点号操作符应该和属性在同一行
    'dot-location': [2, 'property'],
    // 可不使用 === 和 !==
    'eqeqeq': 0,
    // 禁用 arguments.caller 或 arguments.callee
    'no-caller': 2,
    // 禁止使用空解构模式
    'no-empty-pattern': 2,
    // 禁用 eval()
    'no-eval': 2,
    // 禁止扩展原生类型
    'no-extend-native': 2,
    // 禁止不必要的 .bind() 调用
    'no-extra-bind': 2,
    // 禁止 case 语句落空
    'no-fallthrough': 2,
    // 禁止数字字面量中使用前导和末尾小数点：.5 2. => 0.5 2.0
    'no-floating-decimal': 2,
    // 禁用隐式的eval()
    'no-implied-eval': 2,
    // 禁用 __iterator__ 属性
    'no-iterator': 2,
    // 禁用标签语句
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    // 禁用不必要的嵌套块
    'no-lone-blocks': 2,
    // 禁止使用多个空格
    'no-multi-spaces': 2,
    // 禁止使用多行字符串
    'no-multi-str': 2,
    // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-new-wrappers': 2,
    // 禁用八进制字面量
    'no-octal': 2,
    // 禁止在字符串中使用八进制转义序列
    'no-octal-escape': 2,
    // 禁用 __proto__ 属性
    'no-proto': 2,
    // 禁止多次声明同一变量
    'no-redeclare': 2,
    // 禁止出现赋值语句，除非使用括号把它们括起来
    'no-return-assign': [2, 'except-parens'],
    // 禁止自我赋值
    'no-self-assign': 2,
    // 禁止自身比较
    'no-self-compare': 2,
    // 禁用逗号操作符
    'no-sequences': 2,
    // 禁止抛出异常字面量
    'no-throw-literal': 2,
    // 禁用一成不变的循环条件
    'no-unmodified-loop-condition': 2,
    // 禁止不必要的 .call() 和 .apply()
    'no-useless-call': 2,
    // 转义字符
    'no-useless-escape': 0,
    // 禁用 with 语句
    'no-with': 2,
    // 要求 IIFE 使用括号括起来
    'wrap-iife': [2, 'any'],
    // 禁止 “Yoda” 条件
    'yoda': [2, 'never'],

    // Variables
    // 禁止删除变量
    'no-delete-var': 2,
    // 不允许标签与变量同名
    'no-label-var': 2,
    // 禁止将标识符定义为受限的名字
    'no-shadow-restricted-names': 2,
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef': 2,
    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁止出现未使用过的变量
    'no-unused-vars': [2, { 'vars': 'all', 'args': 'none' }],

    // Node.js and Common.js
    // node回调函数必须对error处理
    'handle-callback-err': [2, '^(err|error)$'],
    // 禁止调用 require 时使用 new 操作符
    'no-new-require': 2,
    // 禁止对 __dirname 和 __filename 进行字符串连接
    'no-path-concat': 2,

    // Stylistic Issues 风格规范
    // 数组：[]前后不带空格
    'array-bracket-spacing': [2, 'never'],
    // 代码块{}：在一行时前后要有空格
    'block-spacing': [2, 'always'],
    // 大括号风格要求：与函数名/if/else一行
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    // 驼峰：不强制
    'camelcase': [0],
    // 禁止拖尾逗号：[1,2,]
    'comma-dangle': [2, 'never'],
    // 逗号前后空格：禁止前，后必须
    'comma-spacing': [2, { 'before': false, 'after': true }],
    // 逗号必须在末尾
    'comma-style': [2, 'last'],
    // 缩进：2个空格
    'indent': [2, 2, { SwitchCase: 1 }],
    // jsx属性使用单引号
    'jsx-quotes': [2, 'prefer-single'],
    // key: value间空格，禁止前，后必须
    'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }],
    // 构造函数首字母大写
    'new-cap': [2, { 'newIsCap': true, 'capIsNew': false }],
    // 无参构造函数调用必须括号
    'new-parens': 2,
    // Array构造函数只能1个参数
    'no-array-constructor': 2,
    // 禁止空格和tab混合缩进
    'no-mixed-spaces-and-tabs': 2,
    // 禁止多行空行
    'no-multiple-empty-lines': [2, { 'max': 1 }],
    // 禁止new Object()
    'no-new-object': 2,
    // 禁止行尾空白
    'no-trailing-spaces': 2,
    // 禁止简单的三元运算符：x ? x : 1 => x || 1
    'no-unneeded-ternary': [2, { 'defaultAssignment': false }],
    // 禁止属性前有空格
    'no-whitespace-before-property': 2,
    // 对象中空格
    'object-curly-spacing': [2, 'always'],
    // 变量声明，有初始值的必须分开var
    'one-var': [2, { 'initialized': 'never' }],
    // 操作符换行
    'operator-linebreak': [2, 'after', { 'overrides': { '?': 'before', ':': 'before' } }],
    // 禁止代码块开始结尾空行
    'padded-blocks': [2, 'never'],
    // 字符串用单引号
    'quotes': [2, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    // 末尾分号不限制
    'semi': [0],
    // 分号禁止空格，后必须
    'semi-spacing': [2, { 'before': false, 'after': true }],
    // {前必须有空格
    'space-before-blocks': [2, 'always'],
    // 禁止函数()前有空格
    'space-before-function-paren': [2, 'always'],
    // 禁止()内空格：( 1 + 2 ) => (1 + 2)
    'space-in-parens': [2, 'never'],
    // 操作符周围必须有空格
    'space-infix-ops': 2,
    // word类一元操作符前/后必须有空格(new、delete、typeof...)
    'space-unary-ops': [2, { 'words': true, 'nonwords': false }],
    // 注释后至少一个空格
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],

    // ECMAScript 6
    // 箭头函数箭头前后必须空格
    'arrow-spacing': [2, { before: true, after: true }],
    // class构造函数必须中super()
    'constructor-super': 2,
    // 禁止修改类声明的变量
    'no-class-assign': 2,
    // 禁止修改const
    'no-const-assign': 2,
    // class中禁止重复名称
    'no-dupe-class-members': 2,
    // class中super之前调用this
    'no-this-before-super': 2,
    // 禁止对象中不必要的计算属性：{ ['1']: 1 } => { 1: 1 }
    'no-useless-computed-key': 2,
    // 禁止class中不必要的构造函数
    'no-useless-constructor': 2,
    // 禁止模板字符串中空格：`hello, ${ name }` => `hello, ${name}`
    'template-curly-spacing': 2,

    // Deprecated
    // 不允许修改只读全局变量
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-spaced-func': 2
  }
}
