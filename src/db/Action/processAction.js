import moveActionFromBucketToBucket from './moveActionFromBucketToBucket'

const moveActionToProcessing = moveActionFromBucketToBucket(
  'queue',
  'processing'
)

const processAction = async (context, document) =>
  moveActionToProcessing(context, document, (data) => ({
    ...data,
    attempt: data.attempt ? data.attempt + 1 : 1
  }))

export default processAction
