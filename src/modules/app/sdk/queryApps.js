import { queryEntities } from 'moltres/core'
import { App } from '../schemas'

const queryApps = queryEntities(App)

export default queryApps
