import { batchDeleteEntity } from 'moltres/core'
import { Url } from '../schemas'

const batchDeleteUrl = batchDeleteEntity(Url)

export default batchDeleteUrl
