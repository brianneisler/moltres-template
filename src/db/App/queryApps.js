import { queryEntities } from '../Entity'

import { App } from './schemas'

const queryApps = queryEntities(App)

export default queryApps
