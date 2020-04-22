import { getPropOr } from '../../utils/data'
import moveActionFromBucketToBucket from './moveActionFromBucketToBucket'

const moveActionToRejected = moveActionFromBucketToBucket('processing', 'rejected')

const rejectAction = async (context, document, error) =>
  moveActionToRejected(context, document, (data) => ({
    ...data,
    error: {
      code: getPropOr(0, 'code', error),
      message: getPropOr('', 'message', error),
      stack: getPropOr('', 'stack', error)
    }
  }))

export default rejectAction
