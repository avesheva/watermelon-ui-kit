import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "tsconfig.lib.json",
      insertTypesEntry: true,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'watermelon-ui-kit',
      fileName: (format) => `watermelon-ui-kit.${ format }.ts`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  test: {
    coverage: {
      "include": ["src/components/**/*.vue"],
    },
    environment: "jsdom",
  },
})
