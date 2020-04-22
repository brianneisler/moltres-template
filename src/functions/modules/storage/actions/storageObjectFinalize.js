import { StorageObjectFinalizeAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const storageObjectFinalize = actionBuilder({
  Schema: StorageObjectFinalizeAction
})

export default storageObjectFinalize
