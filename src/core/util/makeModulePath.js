export default function makeModulePath(namespace, type, name) {
  if (!type) {
    return `${namespace}`
  }
  if (!name) {
    return `${namespace}.${type}`
  }
  return `${namespace}.${type}.${name}`
}
