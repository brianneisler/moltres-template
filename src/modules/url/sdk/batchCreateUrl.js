import { batchCreateEntity } from '../../../core/sdk'
import { Url } from '../schemas'

const batchCreateUrl = batchCreateEntity(Url)

export default batchCreateUrl
