import { StorageObjectMetadataUpdateAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const storageObjectMetadataUpdate = actionBuilder({
  Schema: StorageObjectMetadataUpdateAction
})

export default storageObjectMetadataUpdate
