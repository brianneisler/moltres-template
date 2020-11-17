import { findDocumentById } from 'moltres/db'
import { UserProfileImage } from '../schemas'

const findUserProfileImageById = findDocumentById(UserProfileImage)

export default findUserProfileImageById
