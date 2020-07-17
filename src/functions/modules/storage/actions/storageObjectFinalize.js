import { StorageObjectFinalizeAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const storageObjectFinalize = actionBuilder({
  Schema: StorageObjectFinalizeAction
})

export default storageObjectFinalize
