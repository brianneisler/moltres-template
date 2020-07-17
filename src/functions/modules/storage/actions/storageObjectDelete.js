import { StorageObjectDeleteAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const storageObjectDelete = actionBuilder({
  Schema: StorageObjectDeleteAction
})

export default storageObjectDelete
