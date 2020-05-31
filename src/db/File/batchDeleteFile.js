import { File } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeleteFile = batchDeleteEntity(File)

export default batchDeleteFile
