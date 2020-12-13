import { batchCreateEntity } from 'moltres/core'
import { File } from '../schemas'

const batchCreateFile = batchCreateEntity(File)

export default batchCreateFile
