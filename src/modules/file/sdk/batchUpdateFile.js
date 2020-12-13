import { batchUpdateEntity } from 'moltres/core'
import { File } from '../schemas'

const batchUpdateFile = batchUpdateEntity(File)

export default batchUpdateFile
