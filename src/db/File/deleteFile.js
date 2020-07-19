import { deleteEntity } from '../Entity'

import { File } from './schemas'

const deleteFile = deleteEntity(File)

export default deleteFile
