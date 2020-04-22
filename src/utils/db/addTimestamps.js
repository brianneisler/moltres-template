import nowTimestamp from './nowTimestamp'

const addTimestamps = (context, data) => {
  const now = nowTimestamp(context)
  return {
    createdAt: now,
    removedAt: null, // This is added when removed
    updatedAt: now,
    ...data
  }
}

export default addTimestamps
