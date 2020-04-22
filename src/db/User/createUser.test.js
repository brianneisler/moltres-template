import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import createUser from './createUser'
import deleteUser from './deleteUser'

const spec = describe('createUser', () => {
  let adminContext
  beforeAll(async () => {
    adminContext = await setupTestAdminContext(spec)
  })

  afterAll(async () => {
    adminContext = await tearDownTestAdminContext(adminContext)
  })

  describe('ServiceAccount', () => {
    let context
    let result
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
    })

    afterEach(async () => {
      try {
        if (result) {
          await deleteUser(adminContext, result.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
    })

    it('can create an User', async () => {
      const data = {
        name: undefined,
        state: 'pending'
      }
      result = await createUser(context, data)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        state: 'pending',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    })
  })
})
