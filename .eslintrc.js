 module.exports = {
  root: true,
  env: {
    browser: true, // 开发环境配置表示可以使用浏览器的方法
    node: true //
  },
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": [2, "always"],
    "no-new": 0,
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "no-unused-vars": [0, { "vars": "local", "args": "none", "varsIgnorePattern": "[iI]tem" }],
    "vue/no-unused-vars": 0,
    "eqeqeq": 0,
    "no-useless-escape": 0,
    "vue/require-v-for-key": 0,
    "vue/require-valid-default-prop": 0,
    "vue/no-side-effects-in-computed-properties": 0,
    "vue/valid-v-for": 0,
    "vue/valid-v-else": 0,
    "one-var": 0, //连续声明
    "no-self-compare": 0,
    'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }],
    "no-var": 2,
    "prefer-const": 2,
    "prefer-destructuring": 2,
    "prefer-template": 2,
    "prefer-destructuring": ["error", { VariableDeclarator: { object: true } }],
    "object-curly-spacing": ["error", "always"],
    "no-unused-expressions": 0
  }
}
