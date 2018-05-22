module.exports = {
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "ecmaFeatures": {
    "experimentalObjectRestSpread": true,
    "jsx": true,
    "modules": true
  },
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "rules": {
    "array-bracket-spacing": [ "error", "always", {
      "objectsInArrays": false,
      "arraysInArrays": false
    }],
    "arrow-parens": [ "error", "always" ],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "comma-dangle": ["error", "never"],
    "curly": "error",
    "eol-last": "error",
    "generator-star-spacing": ["error", "after"],
    "id-length": ["error", {"min": 2, "max": 50, "properties": "never", "exceptions": ["e", "i", "x", "y", "z", "_", "R"]}],
    "indent": ["error", 2, {"SwitchCase": 1}],
    "no-alert": "error",
    "no-console": "error",
    "no-const-assign": "error",
    "no-else-return": "error",
    "no-shadow": "error",
    "no-undef": "error",
    "no-unused-vars": "error",
    "no-var": "error",
    "prefer-const": "error",
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "spaced-comment": "error",
    "strict": ["error", "never"],
    "react/no-multi-comp": "off",
    "react/prefer-es6-class": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/no-danger": "off"
  }
}
