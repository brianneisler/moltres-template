import { createSelector, select } from 'moltres/lang'

const selectCurrentUserProfile = select(
  createSelector('user_profile.currentUserProfile')
)

export default selectCurrentUserProfile
