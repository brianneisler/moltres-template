import { collection, getFromRef } from '../../../../utils/db'
import { curry, omit } from '../../../../utils/lang'
import { Action } from '../schemas'

const getAction = curry(async (context, data, options = {}) => {
  const Actions = collection(Action, omit(['parentRef'], context))
  const ref = Actions.doc(`${data.type}/${data.bucket}/${data.id}`)
  return getFromRef(context, ref, options)
})

export default getAction
