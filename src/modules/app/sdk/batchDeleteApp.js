import { batchDeleteEntity } from '../../../core/sdk'
import { App } from '../schemas'

const batchDeleteApp = batchDeleteEntity(App)

export default batchDeleteApp
