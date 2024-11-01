/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import packageJson from "./package.json";

const getPackageName = () => {
  return packageJson.name;
};
const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, (char) => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};
const fileNames = {
  es: `${getPackageName()}.es.js`,
  umd: `${getPackageName()}.umd.js`,
  iife: `${getPackageName()}.iife.js`,
};
const pkgInfo = `/**
 * name: ${packageJson.name}
 * version: ${packageJson.version}
 * description: ${packageJson?.description}
 * author: ${packageJson.author}
 * homepage: ${packageJson?.homepage}
 * repository: ${packageJson?.repository?.url}
 */`;

const faviconURL = "/favicon.svg";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: UserConfig) => {
  // such as command line: vite build --mode lib
  if (mode === "lib") {
    return {
      base: "./",
      build: {
        lib: {
          entry: path.resolve(__dirname, "src/lib/index.tsx"),
          name: getPackageNameCamelCase(),
          formats: ["es", "iife", "umd"],
          fileName: (format) => fileNames[format],
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            assetFileNames: `${getPackageName()}.[ext]`,
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
            exports: "named",
          },
        },
        emptyOutDir: true,
        assetsDir: "assets",
      },
      plugins: [react({})],
      resolve: {
        alias: {
          "@/*": path.resolve(__dirname, "src"),
        },
      },
    };
  }
  return {
    plugins: [
      react(),
      VitePWA({
        includeAssets: [faviconURL],
        manifest: {
          theme_color: "#ffffff",
          icons: [
            {
              src: faviconURL,
              sizes: "512x512",
              type: "image/svg+xml",
              purpose: "any maskable",
            },
            {
              src: faviconURL,
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        assets: path.resolve(__dirname, "./src/assets"),
        components: `${path.resolve(__dirname, "./src/components/")}`,
        public: `${path.resolve(__dirname, "./public/")}`,
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./tests/setupTest.ts"],
    },
  };
});
