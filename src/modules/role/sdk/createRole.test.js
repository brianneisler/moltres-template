import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../../test'
import { createUser, deleteUser } from '../../user'
import { createUserRole, deleteUserRole } from '../../user_role'
import createRole from './createRole'
import deleteRole from './deleteRole'

const spec = describe('createRole', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let user
    let userRole
    let result

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
    }, 20000)

    afterEach(async () => {
      try {
        if (result) {
          await deleteRole(adminContext, [user.id, result.id])
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (userRole) {
          await deleteUserRole(adminContext, userRole.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (user) {
          await deleteUser(adminContext, user.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('can create a Role', async () => {
      const userData = {
        name: undefined,
        state: 'pending'
      }
      user = await createUser(context, userData)

      const userRoleData = {
        userId: user.id
      }
      userRole = await createUserRole(context, userRoleData)

      const roleData = {
        userId: user.id,
        roleName: 'admin'
      }

      result = await createRole(context, roleData)

      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching('admin'),
        removedAt: null,
        userId: expect.stringMatching(user.id),
        roleName: expect.stringMatching('admin'),
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    })
  })
})
