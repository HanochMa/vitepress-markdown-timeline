import {
  getDependencieNames,
  toStringTag,
} from "package-tls";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import { dirname } from "path";
import pkg from "./package.json";
import css from "rollup-plugin-import-css";
import typescript from "@rollup/plugin-typescript";

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
  dir: "./dist",
  entryFileNames: `[format]/index.[format].js`,
};

// 共用的 rollup 配置
const shareConf = {
  input: ["src/index.ts", "src/theme/index.ts"],
  external: getDependencieNames(pkg),
  plugins: [
    resolve({
      browser: true,
      extensions: [".tsx", ".ts", ".jsx", ".mjs", ".js", ".json", ".node"],
    }),
    json(),
    commonjs(),
    typescript({
      rootDir: dirname("src/index.ts"),
    }),
    css({
      output: dirname("src/theme/index.ts")
    }),
    terser()
  ],
};

export default [
  {
    ...shareConf,
    output: [
      { ...shareOutput, format: "es" }, // ES module
      { ...shareOutput, format: "cjs" }, // CommonJS
      { ...shareOutput, format: "amd" }, // amd
    ],
  },
];
