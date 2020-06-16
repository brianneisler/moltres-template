import { App } from './schemas'
import { queryEntities } from '../Entity'

const queryApps = queryEntities(App)

export default queryApps
