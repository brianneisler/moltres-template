import loadMoltresConfig from './loadMoltresConfig'

const loadApp = async (context) => {
  const config = await loadMoltresConfig(context)
  if (config) {
    return config
  }
  return {}
}

export default loadApp
