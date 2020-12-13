import { batchDeleteEntity } from 'moltres/core'
import { File } from '../schemas'

const batchDeleteFile = batchDeleteEntity(File)

export default batchDeleteFile
