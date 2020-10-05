import { saveEntity } from '../../../core/sdk'
import { Host } from '../schemas'

const saveHost = saveEntity(Host)

export default saveHost
