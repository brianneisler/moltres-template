import { batchDeleteEntity } from '../Entity'

import { Page } from './schemas'

const batchDeletePage = batchDeleteEntity(Page)

export default batchDeletePage
