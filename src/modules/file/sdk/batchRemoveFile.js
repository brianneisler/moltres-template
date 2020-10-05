import { batchRemoveEntity } from '../../../core/sdk'
import { File } from '../schemas'

const batchRemoveFile = batchRemoveEntity(File)

export default batchRemoveFile
