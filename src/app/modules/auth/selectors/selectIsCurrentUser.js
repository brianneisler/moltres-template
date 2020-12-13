import { curry } from 'moltres/lang'

import selectCurrentUser from './selectCurrentUser'

const selectIsCurrentUser = curry((userId, state) => {
  const currentUser = selectCurrentUser(state)
  if (!currentUser) {
    return null
  }
  return currentUser.id === userId
})

export default selectIsCurrentUser
