import { getDocumentById } from '../../utils/db'

import { EntityStats } from './schemas'

const getEntityStatsById = getDocumentById(EntityStats)

export default getEntityStatsById
