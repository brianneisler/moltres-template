import { deleteServiceAccount } from '../db/ServiceAccount'

const tearDownTestAdminContext = async (adminContext) => {
  await deleteServiceAccount(adminContext, adminContext.serviceAccount.id)
  await adminContext.database.disableNetwork()
}

export default tearDownTestAdminContext
