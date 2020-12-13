import { batchCreateEntity } from 'moltres/core'
import { Url } from '../schemas'

const batchCreateUrl = batchCreateEntity(Url)

export default batchCreateUrl
