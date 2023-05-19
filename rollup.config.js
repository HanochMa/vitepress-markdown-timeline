import {
  removeScope,
  getBaseNameOfHumpFormat,
  getDependencieNames,
  toStringTag,
} from "package-tls";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import { dirname } from "path";
import pkg from "./package.json";

import tsconfig from "./tsconfig.json";
import typescript from "@rollup/plugin-typescript";

// 配置 ---------------------------------

/*
注意：
- rollup 默认翻用的不是 node 的模块解析算法，所以，rollup 找不到由 npm 安装的依赖（模块），所以 由 npm 安装的依赖也不被被要想构建进最终的输出包中；这样也起到了排除 node_modules 中模块的效果；排除模块的功能 由 external 选项指定
- @rollup/plugin-node-resolve 插件可让 rollup 用 node 的模块解析算法来查找模块；
*/

/*
共用的配置
*/

const input = "src/index.ts"; // 输入（入口）文件
const outputDir = dirname(pkg.main || "dist/*"); //输出目录
const pkgName = getBaseNameOfHumpFormat(pkg.name); //驼峰格式的 pkg.name
const extensions = [".tsx", ".ts", ".jsx", ".mjs", ".js", ".json", ".node"]; // 默认查找的文件扩展名

// rollup 中共用的 output 选项
const shareOutput = {
  // 要插入到生成文件顶部的字段串；
  banner: toStringTag(2)`
/*
${pkg.name}	${pkg.version && "v" + pkg.version}
author: ${pkg.author}
license: ${pkg.license}
homepage: ${pkg.homepage}
repository: ${pkg.repository}
description: ${pkg.description}
*/
`,
  // 要插入到生成文件底部的字段串；
  // footer:"",

  // 输出文件的存放目录；只用于会生成多个 chunks 的时候
  dir: "./",
  // 生成 chunks 名字的格式
  entryFileNames: `${outputDir}/${removeScope(pkg.name)}.[format].js`,
};

// 共用的 rollup 配置
const shareConf = {
  input: input,
  external: getDependencieNames(pkg), //移除 package.json 中所有的依赖包
  plugins: [
    // 使用node解析算法查找模块
    resolve({
      /*
			browser   类型: Boolean   默认值: false
			是否优先使用 `package.json` 中的 browser 字段来解析依赖包的入口文件；
			- 构建专门用于浏览器环境的包时，建义设置为 `browser:true`；
			- 构建专门用于node环境的包时，建义设置为 `browser:false` 或者 删除此选项；
			*/
      browser: true,
      /*
			extensions   类型: Array[...String]    默认值: ['.mjs', '.js', '.json', '.node']
			扩展文件名
			*/
      extensions: extensions,
    }),
    json(), //将 json 文件转为 ES6 模块
    commonjs(), // 将依赖的模块从 CommonJS 模块规范转换成 ES2015 模块规范
    typescript({
      // 如果 tsconfig 中的 declarationDir 没有定义，则优先使用 package.json 中的 types 或 typings 定义的目录， 默认值：outputDir
      declarationDir:
        tsconfig.declarationDir ||
        dirname(pkg.types || pkg.typings || outputDir + "/*"),
      // 用来给 输出目录 outDir 提供源文件目录结构的，以便生成的文件中的导入导出能够正确地访问；
      rootDir: dirname(input),
    }), // 将 TypeScript 转换为 JavaScript
  ],
};

// 导出的 rollup 配置
export default [
  /*
	适合模块的构建
	特点：
	   - 以 js模块 的方式被引入
	   - 移除了 node_modules 中的所有依赖
	*/
  {
    ...shareConf,
    output: [
      { ...shareOutput, format: "es" }, // ES module
      { ...shareOutput, format: "cjs" }, // CommonJS
      { ...shareOutput, format: "amd" }, // amd
      /*
			umd：兼容各种引入方式
			可以以 AMD 或 CommonJS 模块的方式引入，也可以用 <script> 标签直接引入;
			由于包中删除了依赖，所以若以 <script> 标签的方式引入，则需要用 <script> 标签的方式先将其依赖引入
			*/
      {
        ...shareOutput,
        format: "umd",
        name: pkgName, //驼峰格式的 pkg.name
        plugins: [terser()], //压缩代码
      }, // umd
    ],
  },

  /*
	适合直接执行的构建
	特点：
	   - 可用 <script> 标签直接引入
	   - 将所有依赖都构建在了一起
	   - 对代码进行了压缩
	*/
  {
    ...shareConf,
    external: getDependencieNames(pkg, "peerDependencies"), //只移除 peerDependencies 中的依赖
    output: {
      ...shareOutput,
      format: "iife",
      name: pkgName, //驼峰格式的 pkg.name
      plugins: [terser()], //压缩代码
    }, // iife
  },
];
