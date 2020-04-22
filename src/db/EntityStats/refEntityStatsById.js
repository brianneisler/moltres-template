import { EntityStats } from './schemas'
import { refDocumentById } from '../../utils/db'

const refEntityStatsById = refDocumentById(EntityStats)

export default refEntityStatsById
