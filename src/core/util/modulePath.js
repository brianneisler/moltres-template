import makeModulePath from './makeModulePath'

export default function modulePath(module) {
  const { namespace, type, name } = module.info
  return makeModulePath(namespace, type, name)
}
