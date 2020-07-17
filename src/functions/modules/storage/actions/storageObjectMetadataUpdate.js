import { actionBuilder } from '../../../../utils/redux'
import { StorageObjectMetadataUpdateAction } from '../schemas'

const storageObjectMetadataUpdate = actionBuilder({
  Schema: StorageObjectMetadataUpdateAction
})

export default storageObjectMetadataUpdate
