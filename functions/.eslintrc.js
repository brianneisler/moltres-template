module.exports = {
  "extends": "airbnb-base",
  "env": {
    "node": true,
    "jest": true
  },
  "plugins": [ "import" ],
  "rules": {
    "array-bracket-spacing": [ "error", "always", {
      "objectsInArrays": false,
      "arraysInArrays": false
    }],
    "arrow-parens": [ "error", "always" ],
    "func-names": "off",
    "comma-dangle": [ "error", "never" ],
    "semi": [ "error", "never" ]
  }
}
