import makeModuleKey from './makeModuleKey'

export default function moduleKey(module) {
  const { namespace, type, name } = module.info
  return makeModuleKey(namespace, type, name)
}
