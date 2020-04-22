import { Action } from './schemas'
import { addUpdatedAtTimestamp, collection, convertDataToFirebase } from '../../utils/db'
import { curry, omit } from '../../utils/data'

const moveActionFromBucketToBucket = curry(
  async (fromBucket, toBucket, context, document, transactionMethod) => {
    const { database } = context
    let data = document.data()
    const Actions = collection(Action, omit(['parentRef'], context))
    const fromBucketRef = Actions.doc(`${data.action.type}/${fromBucket}/${document.id}`)
    const toBucketRef = Actions.doc(`${data.action.type}/${toBucket}/${document.id}`)

    await database.runTransaction(async (transaction) => {
      if (transactionMethod) {
        data = transactionMethod(data)
      }

      // WORKAROUND BRN: Firebase instance used to generate the Timestamp for this
      // document is different then our firebase instance. So it thinks the
      // Timestamps are custom objects when they really aren't.
      data = convertDataToFirebase(context, data)
      data = addUpdatedAtTimestamp(context, data)

      transaction.delete(fromBucketRef)
      transaction.set(toBucketRef, data)
    })

    return toBucketRef.get()
  }
)

export default moveActionFromBucketToBucket
