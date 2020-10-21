import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../../test'
import { createUser, deleteUser } from '../../user'
import { createUserRole, deleteUserRole, UserRole } from '../../user_role'
import createRole from './createRole'

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
          await deleteUser(adminContext, result.id)
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
      console.log('User created:')
      console.log(user)

      const userRoleData = {
        userId: user.id
      }
      userRole = await createUserRole(context, userRoleData)
      console.log('User Role created:')
      console.log(userRole)

      const roleData = {
        userId: user.id,
        roleName: 'admin'
      }

      result = await createRole(context, roleData)
      console.log(result)
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
