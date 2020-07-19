import { batchRemoveEntity } from '../Entity'

import { File } from './schemas'

const batchRemoveFile = batchRemoveEntity(File)

export default batchRemoveFile
