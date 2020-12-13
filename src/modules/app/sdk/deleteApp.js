import { deleteEntity } from 'moltres/core'
import { App } from '../schemas'

const deleteApp = deleteEntity(App)

export default deleteApp
