import { deleteEntity } from '../../../core/sdk'
import { App } from '../schemas'

const deleteApp = deleteEntity(App)

export default deleteApp
