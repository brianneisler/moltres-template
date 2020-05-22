import { Url } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemoveUrl = batchRemoveEntity(Url)

export default batchRemoveUrl
