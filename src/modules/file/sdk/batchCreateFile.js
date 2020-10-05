import { batchCreateEntity } from '../../../core/sdk'
import { File } from '../schemas'

const batchCreateFile = batchCreateEntity(File)

export default batchCreateFile
