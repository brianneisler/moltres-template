import { batchRemoveEntity } from '../../../core/sdk'
import { App } from '../schemas'

const batchRemoveApp = batchRemoveEntity(App)

export default batchRemoveApp
