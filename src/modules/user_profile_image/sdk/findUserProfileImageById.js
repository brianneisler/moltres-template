import { findDocumentById } from '../../../utils/db'
import { UserProfileImage } from '../schemas'

const findUserProfileImageById = findDocumentById(UserProfileImage)

export default findUserProfileImageById
