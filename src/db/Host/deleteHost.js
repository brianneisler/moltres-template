import { deleteEntity } from '../Entity'

import { Host } from './schemas'

const deleteHost = deleteEntity(Host)

export default deleteHost
