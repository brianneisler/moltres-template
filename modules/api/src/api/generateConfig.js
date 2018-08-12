const generateConfig = (context) => (config) => ({
  ...config,
  api: {
    url: context.get('API_URL')
  }
})

export default generateConfig
