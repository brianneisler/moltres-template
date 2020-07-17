import { actionBuilder } from '../../../../utils/redux'
import { StorageObjectDeleteAction } from '../schemas'

const storageObjectDelete = actionBuilder({
  Schema: StorageObjectDeleteAction
})

export default storageObjectDelete
