import { batchRemoveEntity } from 'moltres/core'
import { File } from '../schemas'

const batchRemoveFile = batchRemoveEntity(File)

export default batchRemoveFile
