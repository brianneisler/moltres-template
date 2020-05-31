import { File } from './schemas'
import { deleteEntity } from '../Entity'

const deleteFile = deleteEntity(File)

export default deleteFile
