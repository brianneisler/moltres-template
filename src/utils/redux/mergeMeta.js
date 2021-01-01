import { merge } from '../lang'

const mergeMeta = (metadata, action) =>
  merge(action, {
    meta: merge(action.meta, metadata)
  })

export default mergeMeta
