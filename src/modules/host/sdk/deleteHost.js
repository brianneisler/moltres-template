import { deleteEntity } from 'moltres/core'
import { Host } from '../schemas'

const deleteHost = deleteEntity(Host)

export default deleteHost
