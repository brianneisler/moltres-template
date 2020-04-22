import nowTimestamp from './nowTimestamp'

const addUpdatedAtTimestamp = (context, data) => {
  const now = nowTimestamp(context)
  return {
    ...data,
    updatedAt: now
  }
}

export default addUpdatedAtTimestamp
