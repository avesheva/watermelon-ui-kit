import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(() => ({
  plugins: [
    vue(),
    dts({
      tsconfigPath: 'tsconfig.lib.json',
      insertTypesEntry: true,
      outDir: 'dist',
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/components/index.ts'),
      name: 'watermelon-ui-kit',
      fileName: (format) => `watermelon-ui-kit.${ format }.js`,
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
      'include': ['src/components/**/*.vue'],
    },
    environment: 'jsdom',
  },
}))
