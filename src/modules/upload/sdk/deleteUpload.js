import { deleteEntity } from 'moltres/core'
import { Upload } from '../schemas'

const deleteUpload = deleteEntity(Upload)

export default deleteUpload
