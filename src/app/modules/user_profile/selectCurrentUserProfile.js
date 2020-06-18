import { createSelector, select } from '../../../utils/lang'

const selectCurrentUserProfile = select(
  createSelector('user_profile.currentUserProfile')
)

export default selectCurrentUserProfile
