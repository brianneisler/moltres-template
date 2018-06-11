import { assocPath, is, path, pathEq, split }  from 'ramda'

const config = (data) => {
  const get = (configPath) => {
    const parts = is(String, configPath) ? split('.', configPath) : configPath
    return path(parts, data)
  }

  const has = (configPath) => {
    const parts = is(String, configPath) ? split('.', configPath) : configPath
    return !pathEq(parts, undefined, data)
  }

  const set = (configPath, value) => {
    const parts = is(String, configPath) ? split('.', configPath) : configPath
    return config(assocPath(parts, value, data))
  }

  const toJSON = () => JSON.stringify(data)

  return {
    get,
    has,
    set,
    toJSON
  }
}

export default config
