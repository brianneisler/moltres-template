import { App } from './schemas'
import { batchCreateEntity } from '../Entity'

const batchCreateApp = batchCreateEntity(App)

export default batchCreateApp
