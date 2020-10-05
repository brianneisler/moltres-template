import moveActionFromBucketToBucket from './moveActionFromBucketToBucket'

const moveActionToResolved = moveActionFromBucketToBucket(
  'processing',
  'resolved'
)

const resolveAction = async (context, document, result) =>
  moveActionToResolved(context, document, (data) => ({
    ...data,
    result: JSON.stringify(result || null)
  }))

export default resolveAction
