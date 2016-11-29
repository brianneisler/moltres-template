export default function makeModuleKey(namespace, type, name) {
  return `${namespace}:${type}:${name}`
}
