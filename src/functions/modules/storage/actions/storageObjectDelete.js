import { StorageObjectDeleteAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const storageObjectDelete = actionBuilder({
  Schema: StorageObjectDeleteAction
})

export default storageObjectDelete
