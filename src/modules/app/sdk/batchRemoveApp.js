import { batchRemoveEntity } from 'moltres/core'
import { App } from '../schemas'

const batchRemoveApp = batchRemoveEntity(App)

export default batchRemoveApp
