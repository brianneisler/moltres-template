import { actionBuilder } from 'moltres/redux'
import { StorageObjectDeleteAction } from '../schemas'

const storageObjectDelete = actionBuilder({
  Schema: StorageObjectDeleteAction
})

export default storageObjectDelete
