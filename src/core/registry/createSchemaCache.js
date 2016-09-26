import _ from 'mudash'

export default function createSchemaCache() {
  let cacheMap = {}

  function schemaKey(type, name) {
    return `${type}.${name}`
  }
  function get(type, schema) {
    const { name } = schema.info
    return _.get(cacheMap, schemaKey(type, name))
  }

  function has(type, schema) {
    const { name } = schema.info
    return _.has(cacheMap, schemaKey(type, name))
  }

  function set(type, schema) {
    const { name } = schema.info
    cacheMap = _.assoc(cacheMap, schemaKey(type, name), schema)
    return cacheMap
  }

  return {
    get,
    has,
    set
  }
}
