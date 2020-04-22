import { UserProfileImage } from './schemas'
import { findDocumentById } from '../../utils/db'

const findUserProfileImageById = findDocumentById(UserProfileImage)

export default findUserProfileImageById
