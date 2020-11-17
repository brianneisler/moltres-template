import { batchRemoveEntity } from 'moltres/core'
import { Url } from '../schemas'

const batchRemoveUrl = batchRemoveEntity(Url)

export default batchRemoveUrl
