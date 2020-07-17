import { App } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemoveApp = batchRemoveEntity(App)

export default batchRemoveApp
