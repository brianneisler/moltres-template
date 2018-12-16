module.exports = () => ({
  presets: [
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'usage'
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-proposal-async-generator-functions'
  ]
})
