import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "tsconfig.lib.json",
      insertTypesEntry: true,
    }),
  ],
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
  },
})
