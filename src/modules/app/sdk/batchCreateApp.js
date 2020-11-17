import { batchCreateEntity } from 'moltres/core'
import { App } from '../schemas'

const batchCreateApp = batchCreateEntity(App)

export default batchCreateApp
