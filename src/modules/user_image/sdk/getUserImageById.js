import { getDocumentById } from '../../../utils/db'
import { UserImage } from '../schemas'

const getUserImageById = getDocumentById(UserImage)

export default getUserImageById
