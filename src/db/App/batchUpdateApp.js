import { App } from './schemas'
import { batchUpdateEntity } from '../Entity'

const batchUpdateApp = batchUpdateEntity(App)

export default batchUpdateApp
