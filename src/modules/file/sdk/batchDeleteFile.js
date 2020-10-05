import { batchDeleteEntity } from '../../../core/sdk'
import { File } from '../schemas'

const batchDeleteFile = batchDeleteEntity(File)

export default batchDeleteFile
