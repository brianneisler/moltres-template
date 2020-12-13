import { queryEntities } from 'moltres/core'
import { File } from '../schemas'

const queryFiles = queryEntities(File)

export default queryFiles
