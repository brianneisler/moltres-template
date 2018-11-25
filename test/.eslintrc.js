module.exports = {
  root: true,
  extends: 'prettier',
  plugins: ['import', 'prettier', 'sort-imports-es6-autofix'],
  env: {
    es6: true,
    node: true,
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  rules: {
    'array-bracket-spacing': [
      'error',
      'never',
      {
        objectsInArrays: false,
        arraysInArrays: false
      }
    ],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'comma-dangle': ['error', 'never'],
    'curly': 'error',
    'eol-last': 'error',
    'func-names': 'off',
    'id-length': ['error', {'min': 2, 'max': 50, 'properties': 'never', 'exceptions': ['e', 'i', 'n', 't', 'x', 'y', 'z', '_']}],
    'no-alert': 'error',
    'no-console': 'error',
    'no-const-assign': 'error',
    'no-else-return': 'error',
    'no-empty': 'off',
    'no-shadow': 'error',
    'no-undef': 'error',
    'no-unused-vars': 'error',
    'no-use-before-define': 'error',
    'no-useless-constructor': 'error',
    'no-var': 'error',
    'object-curly-newline': 'off',
    'object-shorthand': 'off',
    'prefer-const': 'error',
    'prefer-destructuring': ['error', {'object': true, 'array': false}],
    'quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true,
        'avoidEscape': true
      }
    ],
    'semi': ['error', 'never'],
    'spaced-comment': 'error',
    'strict': ['error', 'never'],
    'prettier/prettier': 'error',
    'sort-imports-es6-autofix/sort-imports-es6': ['error', {
      'ignoreCase': false,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
    }]
  }
}
