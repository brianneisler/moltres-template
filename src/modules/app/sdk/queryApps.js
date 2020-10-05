import { queryEntities } from '../../../core/sdk'
import { App } from '../schemas'

const queryApps = queryEntities(App)

export default queryApps
