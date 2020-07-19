import { queryEntities } from '../Entity'

import { Host } from './schemas'

const queryHosts = queryEntities(Host)

export default queryHosts
