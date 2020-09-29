import typescript from "@rollup/plugin-typescript";
import resolve from '@rollup/plugin-node-resolve';
// import { uglify } from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { terser } from "rollup-plugin-terser";
import replace from '@rollup/plugin-replace';

const version = process.env.VERSION || require("./package.json").version;

const banner =
  "/*!\n" +
  ` * StyleEditor.js v${version}\n` +
  ` * (c) 2020-${new Date().getFullYear()} Cui Jian\n` +
  " * Released under the MIT License.\n" +
  " */";

const vars = {
  "process.env.NODE_ENV": JSON.stringify('production'),
  "process.env": "{}",
  "process.platform": "{}",
  "process.stdout": "{}"
};


export default {
  input: "./src/style-editor.tsx",
  external: [],
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
    }),
    commonjs(),
    nodePolyfills(),
    // souceMaps(),
    postcss({
      extract: false,
      modules: true,
      // use: ['sass'],
    }),
    resolve({
      browser: true
    }),
    replace(vars),
    // uglify()
    // terser()
  ],
  output: [
    {
      format: "cjs",
      file: "dest/style-editor.cjs.js",
      // sourcemap: true,
      banner,
    },
    {
      format: "umd",
      name: 'styleEditor',
      file: "dest/style-editor.umd.js",
      // sourcemap: true,
      // exports: 'default',
      banner,
    },
  ],
  
};
