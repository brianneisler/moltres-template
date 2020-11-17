import { batchCreateEntity } from 'moltres/core'
import { Page } from '../schemas'

const batchCreatePage = batchCreateEntity(Page)

export default batchCreatePage
