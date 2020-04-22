import { UserImage } from './schemas'
import { getDocumentById } from '../../utils/db'

const getUserImageById = getDocumentById(UserImage)

export default getUserImageById
