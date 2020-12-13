import { getDocumentById } from 'moltres/db'

import { EntityStats } from '../schemas'

const getEntityStatsById = getDocumentById(EntityStats)

export default getEntityStatsById
