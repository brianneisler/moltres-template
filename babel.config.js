// NOTE BRN: This has to be an object instead of a function since this is used
// by a require statement in the bootstrap.js file
module.exports = {
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        targets: {
          node: '10'
        },
        useBuiltIns: 'usage'
      }
    ],
    'babel-preset-expo'
  ]
}
