import { refDocumentById } from '../../../utils/db'
import { EntityStats } from '../schemas'

const refEntityStatsById = refDocumentById(EntityStats)

export default refEntityStatsById
