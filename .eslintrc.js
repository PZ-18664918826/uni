module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  parser: 'vue-eslint-parser',
  globals: {
    uni: 'readonly',
    getApp: 'readonly',
    getCurrentPages: 'readonly'
  },
  plugins: ['vue'],
  extends: ['plugin:vue/recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  rules: {
    'no-multi-assign': 'off',
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 0,
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@/config',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/plugins',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/components',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/store',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/service',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/utils',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/assets/**',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['vue', 'vux', 'uview-ui']
      }
    ],
    'import/prefer-default-export': 0,
    'max-classes-per-file': 0,
    'no-shadow': 0,
    'no-unused-vars': 'warn',
    'no-use-before-define': 0,
    'vue/comment-directive': 0,
    'vue/multi-word-component-names': 0
  }
};
