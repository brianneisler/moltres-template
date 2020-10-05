import { deleteServiceAccount } from '../modules/service_account'

const tearDownTestAdminContext = async (adminContext) => {
  await deleteServiceAccount(adminContext, adminContext.serviceAccount.id)
  await adminContext.app.delete()
}

export default tearDownTestAdminContext
