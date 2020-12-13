import { selectQueryResults } from 'moltres/core'
import { curry } from 'moltres/lang'

const selectUserProfile = curry((userId, state) =>
  selectQueryResults(`UserProfile.${userId}`, state)
)

export default selectUserProfile
