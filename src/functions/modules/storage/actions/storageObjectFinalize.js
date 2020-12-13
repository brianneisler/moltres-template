import { actionBuilder } from 'moltres/redux'
import { StorageObjectFinalizeAction } from '../schemas'

const storageObjectFinalize = actionBuilder({
  Schema: StorageObjectFinalizeAction
})

export default storageObjectFinalize
