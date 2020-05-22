import { Host } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdateHost = batchUpdateEntity(Host)

export default batchUpdateHost
