import { deleteEntity } from '../../../core/sdk'
import { File } from '../schemas'

const deleteFile = deleteEntity(File)

export default deleteFile
