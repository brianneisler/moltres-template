module.exports = () => ({
  presets: [
    'env',
    'react-native'
  ],
  plugins: [
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-proposal-async-generator-functions'
  ]
})
