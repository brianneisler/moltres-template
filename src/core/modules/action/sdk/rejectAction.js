import { getPropertyOr } from '../../../../utils/lang'

import moveActionFromBucketToBucket from './moveActionFromBucketToBucket'

const moveActionToRejected = moveActionFromBucketToBucket(
  'processing',
  'rejected'
)

const rejectAction = async (context, document, error) =>
  moveActionToRejected(context, document, (data) => ({
    ...data,
    error: {
      code: getPropertyOr(0, 'code', error),
      message: getPropertyOr('', 'message', error),
      stack: getPropertyOr('', 'stack', error)
    }
  }))

export default rejectAction
