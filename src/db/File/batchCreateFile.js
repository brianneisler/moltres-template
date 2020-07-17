import { batchCreateEntity } from '../Entity'

import { File } from './schemas'

const batchCreateFile = batchCreateEntity(File)

export default batchCreateFile
