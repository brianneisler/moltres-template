import { batchDeleteEntity } from '../Entity'

import { App } from './schemas'

const batchDeleteApp = batchDeleteEntity(App)

export default batchDeleteApp
