import { batchDeleteEntity } from '../Entity'

import { File } from './schemas'

const batchDeleteFile = batchDeleteEntity(File)

export default batchDeleteFile
