import { curry } from '../../../utils/lang'
import { selectQueryResults } from '../../../core'

const selectUserProfile = curry((userId, state) =>
  selectQueryResults(`UserProfile.${userId}`, state)
)

export default selectUserProfile
