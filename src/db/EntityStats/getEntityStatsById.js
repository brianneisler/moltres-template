import { EntityStats } from './schemas'
import { getDocumentById } from '../../utils/db'

const getEntityStatsById = getDocumentById(EntityStats)

export default getEntityStatsById
