// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    "prefer-template": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "func-names": "off",
    "no-restricted-syntax": "off",
    "guard-for-in": "off",
    "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "never",
        "imports": "never",
        "exports": "never",
        "functions": "never",
    }],
    "strict": ["error", "global"],
    "no-const-assign": "warn",
    "no-this-before-super": "warn",
    "no-undef": "warn",
    "no-unreachable": "warn",
    "no-unused-vars": "warn",
    "constructor-super": "warn",
    "valid-typeof": "warn",
    "semi": "error",
    "indent": ["error", 4],
    "no-path-concat": 0,
    "no-var": "error",
    "prefer-const": "error",
    "no-trailing-spaces": "error",
    "comma-spacing": "error",
    "space-infix-ops": "error",
    "semi-spacing": "error",
    "key-spacing": "error",
    "keyword-spacing": "error",
    "quotes": ["error", "single"],
    "eol-last": "error",
    "eqeqeq": "error",
    "arrow-spacing": "error",
    "no-cond-assign": "error",
    "no-dupe-args": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-semi": "error",
    "no-irregular-whitespace": "error",
    "no-unexpected-multiline": "error",
    "no-unsafe-negation": "error",
    "no-case-declarations": "error",
    "no-multi-spaces": "error",
    "dot-notation": "warn",
    "no-extra-label": "error",
    "no-extra-bind": "warn",
    "no-floating-decimal": "error",
    "no-global-assign": "error",
    "no-redeclare": "warn",
    "no-self-assign": "error",
    "no-unused-labels": "error",
    "wrap-iife": "error",
    "yoda": ["error", "never"],
    "no-octal": "error",
    "array-bracket-spacing":["error", "never"],
    "block-spacing": ["error", "always"],
    "brace-style": "error",
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "func-call-spacing": ["error", "never"],
    "new-parens": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-multiple-empty-lines": ["error", {
        "max": 1
    }],
    "no-unneeded-ternary": "warn",
    "no-whitespace-before-property": "error",
    "object-curly-newline": ["error", { "ObjectExpression": "always" }],
    "object-curly-spacing": ["error", "never"],
    "object-property-newline": "error",
    "operator-linebreak": ["error", "before"],
    "padded-blocks": ["error", "never"],
    "space-before-blocks": "error",
    "space-before-function-paren": ["error", "never"],
    "space-in-parens": ["error", "never"],
    "space-unary-ops": ["error", {
        "words": true,
        "nonwords": false
    }],
    "spaced-comment": ["error", "always"],
    "arrow-body-style": ["error", "as-needed"],
    "generator-star-spacing": ["error", {
        "before": false,
        "after": true
    }],
    "no-useless-computed-key": "error",
    "no-class-assign": "error",
    "no-dupe-class-members": "error",
    "no-useless-rename": "error",
    "object-shorthand": ["error", "always", {
        "avoidQuotes": true,
        "avoidExplicitReturnArrows": true
    }],
    "prefer-spread": "error",
    "require-yield": "error",
    "rest-spread-spacing": ["error", "never"],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
