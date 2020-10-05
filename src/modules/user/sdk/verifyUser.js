import expected from '../../../utils/error/expected'

const verifyUser = (user, { id, statusCode }) => {
  if (!user) {
    throw new Error(`Could not find User${id ? ':' + id : ''}`)
  }
  if (user.removedAt) {
    throw expected({
      code: 'USER_REMOVED',
      message: `User '${user.id}' has been removed`,
      statusCode
    })
  } else if (user.state === 'disabled') {
    throw expected({
      code: 'USER_DISABLED',
      message: `User '${user.id}' has been disabled`,
      statusCode
    })
  }
  return user
}

export default verifyUser
