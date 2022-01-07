/*
 * @Author: lrqnew
 * @Date: 2021-12-15 16:15:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-07 17:26:46
 * @FilePath: \utils-q\rollup.config.js
 * @Description: 
 */
import moduleResolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import commonjs from '@rollup/plugin-commonjs'
// const peerDeps = Object.keys(require("./package.json").peerDependencies)

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    moduleResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    typescript({ tsconfig: "./tsconfig.json" }),
    commonjs(),
  ],
  // external: peerDeps,
}
