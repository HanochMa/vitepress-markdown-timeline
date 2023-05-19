module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "globalThis":"readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        // 允许 debugger 运行在 开发 环境中
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 关闭 var 关键字的提示
        "no-var":'off',
        // 警告 case 穿透
        "no-fallthrough":'warn',
        // 无用变量
        "no-unused-vars": "off",
        // typescript 的 无用变量
        "@typescript-eslint/no-unused-vars": "error",
    }
};
