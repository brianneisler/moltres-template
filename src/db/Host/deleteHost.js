import { Host } from './schemas'
import { deleteEntity } from '../Entity'

const deleteHost = deleteEntity(Host)

export default deleteHost
