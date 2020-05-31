import { curry } from '../../../utils/data'
import { selectQueryResults } from '../../../core'

const selectUserProfile = curry((userId, state) =>
  selectQueryResults(`UserProfile.${userId}`, state)
)

export default selectUserProfile
