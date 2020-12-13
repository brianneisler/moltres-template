import { getDocumentById } from 'moltres/db'
import { UserImage } from '../schemas'

const getUserImageById = getDocumentById(UserImage)

export default getUserImageById
