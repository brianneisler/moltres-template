import { selectQueryResults } from '../../../../core'
import { curry } from '../../../../utils/lang'

const selectUserProfile = curry((userId, state) =>
  selectQueryResults(`UserProfile.${userId}`, state)
)

export default selectUserProfile
