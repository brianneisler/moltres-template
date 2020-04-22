import { User } from './schemas'
import { refDocumentById } from '../../utils/db'

const refUserById = refDocumentById(User)

export default refUserById
