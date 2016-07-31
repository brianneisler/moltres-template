import _ from 'mudash';

export default class SchemaCache {

  static cacheMap = {};

  static get(schema) {
    const { name } = schema.info;
    return _.get(SchemaCache.cacheMap, name);
  }

  static has(schema) {
    const { name } = schema.info;
    return _.has(SchemaCache.cacheMap, name);
  }

  static set(schema) {
    const { name } = schema.info;
    return _.set(SchemaCache.cacheMap, name, schema);
  }
}
