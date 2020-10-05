import { queryEntities } from '../../../core/sdk'
import { Host } from '../schemas'

const queryHosts = queryEntities(Host)

export default queryHosts
