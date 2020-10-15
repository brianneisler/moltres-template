import { queryEntities } from '../../../core/sdk'
import { File } from '../schemas'

const queryFiles = queryEntities(File)

export default queryFiles
