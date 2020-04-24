import { createUser, deleteUser } from '../User'
import { prop } from 'ramda'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import { v4 as uuidv4 } from 'uuid'
import createAccessToken from './createAccessToken'
import deleteAccessToken from './deleteAccessToken'

const spec = describe('deleteAccessToken', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let user
    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(context, {
        name: 'test-user',
        state: 'pending'
      })
    }, 20000)

    afterEach(async () => {
      try {
        if (user) {
          await deleteUser(adminContext, prop('id', user))
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('deletes an existing AccessToken', async () => {
      const data = {
        token: uuidv4(),
        userId: user.id,
        valid: true
      }
      const accessToken = await createAccessToken(context, data)
      const result = await deleteAccessToken(context, accessToken.id)

      expect(result).toBe(undefined)
    })

    it('Does not error when AccessToken does not exist', async () => {
      await expect(deleteAccessToken(context, 'doesnotexist12345678')).resolves.toBe(undefined)
    })
  })
})
