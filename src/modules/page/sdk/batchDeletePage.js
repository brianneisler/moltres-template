import { batchDeleteEntity } from 'moltres/core'
import { Page } from '../schemas'

const batchDeletePage = batchDeleteEntity(Page)

export default batchDeletePage
