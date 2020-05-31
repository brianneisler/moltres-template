import { File } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateFile = batchCreateEntity(File)

export default batchCreateFile
