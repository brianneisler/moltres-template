import { curry } from '../lang'

import nowTimestamp from './nowTimestamp'

const addRemovedAtTimestamp = curry((context, data) => {
  const now = nowTimestamp(context)
  return {
    ...data,
    removedAt: now
  }
})

export default addRemovedAtTimestamp
