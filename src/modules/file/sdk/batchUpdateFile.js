import { batchUpdateEntity } from '../../../core/sdk'
import { File } from '../schemas'

const batchUpdateFile = batchUpdateEntity(File)

export default batchUpdateFile
