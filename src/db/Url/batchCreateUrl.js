import { Url } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateUrl = batchCreateEntity(Url)

export default batchCreateUrl
