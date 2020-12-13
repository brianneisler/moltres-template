import { isObject, merge, reduce, values } from 'moltres/lang'

const setupSdkMethods = (store) =>
  reduce(
    (accumMethods, mod) => {
      if (isObject(mod.sdk)) {
        return merge(accumMethods, mod.sdk)
      }
      return accumMethods
    },
    {},
    values(store.getModules())
  )

export default setupSdkMethods
