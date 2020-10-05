import { batchCreateEntity } from '../../../core/sdk'
import { App } from '../schemas'

const batchCreateApp = batchCreateEntity(App)

export default batchCreateApp
