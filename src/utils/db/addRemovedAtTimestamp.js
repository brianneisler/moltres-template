import { curry } from '../data'
import nowTimestamp from './nowTimestamp'

const addRemovedAtTimestamp = curry((context, data) => {
  const now = nowTimestamp(context)
  return {
    ...data,
    removedAt: now
  }
})

export default addRemovedAtTimestamp
