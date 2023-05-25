import {
  getDependencieNames
} from "package-tls";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import { dirname } from "path";
import pkg from "./package.json";
// import css from "rollup-plugin-import-css";
import css from 'rollup-plugin-css-only'
import typescript from "@rollup/plugin-typescript";

// rollup 中共用的 output 选项
const shareOutput = {
  dir: "./dist",
  entryFileNames: `[format]/index.[format].js`,
  assetFileNames: 'theme/index.css'
};

// 共用的 rollup 配置
const shareConf = {
  input: ["src/index.ts"],
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
    css(),
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
