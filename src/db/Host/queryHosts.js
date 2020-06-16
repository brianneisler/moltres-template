import { Host } from './schemas'
import { queryEntities } from '../Entity'

const queryHosts = queryEntities(Host)

export default queryHosts
