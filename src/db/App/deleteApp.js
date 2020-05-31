import { App } from './schemas'
import { deleteEntity } from '../Entity'

const deleteApp = deleteEntity(App)

export default deleteApp
