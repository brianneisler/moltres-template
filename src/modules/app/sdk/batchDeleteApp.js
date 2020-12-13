import { batchDeleteEntity } from 'moltres/core'
import { App } from '../schemas'

const batchDeleteApp = batchDeleteEntity(App)

export default batchDeleteApp
