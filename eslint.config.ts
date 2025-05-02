import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,vue}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },

  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-indent': ['error', 2],
      'vue/no-unused-properties': ['error'],
      'vue/no-unused-emit-declarations': ['error'],
      'vue/no-console': ['error'],
      'vue/template-curly-spacing': [2, 'always'],
      'vue/mustache-interpolation-spacing': [2, 'always'],
      'vue/attributes-order': ['error', {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'TWO_WAY_BINDING',
          'GLOBAL',
          'UNIQUE',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      }],
      'no-unused-vars': 'off',
      'semi': [2, 'never'],
      'indent': ['error', 2],
      '@typescript-eslint/no-unused-vars': ['error'],
      'max-len': [2, 120],
      'object-curly-spacing': ['error', 'always'],
      'template-curly-spacing': [2, 'always'],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
])