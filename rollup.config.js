import { terser } from "rollup-plugin-terser";
//import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

const devMode = process.env.NODE_ENV === "development";
console.log(`${devMode ? "development" : "production"} mode bundle`);

export default [
  {
    output: {
      format: "es",
      sourcemap: devMode ? "inline" : false,
      plugins: [
        terser({
          ecma: 2020,
          mangle: { toplevel: true },
          compress: {
            module: true,
            toplevel: true,
            unsafe_arrows: true,
            drop_console: false, //!devMode,
            drop_debugger: !devMode,
          },
          output: { quote_style: 1 },
        }),
      ],
    },
    plugins: [json()],
  },
];
