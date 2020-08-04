module.exports = {
  extends: [ '@nuxtjs/eslint-config-typescript' ],
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': [ 'error', 'always' ],
    'comma-dangle': 'off',
    'array-bracket-spacing': 'off',
    curly: [ 'error', 'multi-line' ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'any',
          component: 'any',
        },
        svg: 'any',
        math: 'any',
      },
    ],
    'space-before-function-paren': [ 2, 'never' ],
  },
};
