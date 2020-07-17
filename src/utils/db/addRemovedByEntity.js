import { curry } from '../lang'

const addRemovedByEntity = curry(({ currentUser, serviceAccount }, data) => {
  if (currentUser) {
    return {
      removedByEntityId: currentUser.id,
      removedByEntityType: 'User',
      ...data
    }
  }
  if (serviceAccount) {
    return {
      removedByEntityId: serviceAccount.id,
      removedByEntityType: 'ServiceAccount',
      ...data
    }
  }
  return {
    removedByEntityId: null,
    removedByEntityType: null,
    ...data
  }
})

export default addRemovedByEntity
