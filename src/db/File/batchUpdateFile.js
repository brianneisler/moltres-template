import { File } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdateFile = batchUpdateEntity(File)

export default batchUpdateFile
