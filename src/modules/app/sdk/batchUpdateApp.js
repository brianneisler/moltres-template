import { batchUpdateEntity } from '../../../core/sdk'
import { App } from '../schemas'

const batchUpdateApp = batchUpdateEntity(App)

export default batchUpdateApp
