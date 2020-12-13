import { queryEntities } from 'moltres/core'
import { Host } from '../schemas'

const queryHosts = queryEntities(Host)

export default queryHosts
