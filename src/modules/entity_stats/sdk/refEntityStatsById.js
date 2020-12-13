import { refDocumentById } from 'moltres/db'

import { EntityStats } from '../schemas'

const refEntityStatsById = refDocumentById(EntityStats)

export default refEntityStatsById
