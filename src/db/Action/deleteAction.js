import { Action } from './schemas'
import { collection } from '../../utils/db'
import { omit } from '../../utils/data'

const deleteAction = async (context, type, id) => {
  const Actions = collection(Action, omit(['parentRef'], context))
  const ref = Actions.doc(`${type}/queue/${id}`)
  return ref.delete()
}

export default deleteAction
