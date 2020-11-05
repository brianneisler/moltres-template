import moveActionFromBucketToBucket from './moveActionFromBucketToBucket'

const moveActionToResolved = moveActionFromBucketToBucket(
  'processing',
  'resolved'
)

const resolveAction = async (context, document, results) =>
  moveActionToResolved(context, document, (data) => ({
    ...data,
    results: JSON.stringify(results || null)
  }))

export default resolveAction
