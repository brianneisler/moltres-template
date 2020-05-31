import { File } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemoveFile = batchRemoveEntity(File)

export default batchRemoveFile
