const generateConfig = (context) => (config) => ({
  ...config,
  storage: {
    bucket: `${context.get('FIREBASE_PROJECT_ID')}.appspot.com`
  }
})

export default generateConfig
