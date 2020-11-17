import { batchUpdateEntity } from 'moltres/core'
import { App } from '../schemas'

const batchUpdateApp = batchUpdateEntity(App)

export default batchUpdateApp
