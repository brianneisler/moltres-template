import { deleteEntity } from 'moltres/core'
import { File } from '../schemas'

const deleteFile = deleteEntity(File)

export default deleteFile
