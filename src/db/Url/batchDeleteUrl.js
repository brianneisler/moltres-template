import { Url } from './schemas'
import { batchDeleteEntity } from '../Entity'

const batchDeleteUrl = batchDeleteEntity(Url)

export default batchDeleteUrl
