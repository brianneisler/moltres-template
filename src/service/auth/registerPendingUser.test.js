import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import deletePendingUser from './deletePendingUser'
import registerPendingUser from './registerPendingUser'

const spec = describe('registerPendingUser', () => {
  let adminContext
  beforeAll(async () => {
    adminContext = await setupTestAdminContext(spec)
  })

  afterAll(async () => {
    adminContext = await tearDownTestAdminContext(adminContext)
  })

  describe('ServiceAccount', () => {
    let context
    let user
    let phoneNumber
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
    })

    afterEach(async () => {
      try {
        if (user) {
          await deletePendingUser(context, user.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
    })

    it('can register a pending User', async () => {
      const data = {
        phoneNumber: '9282356681'
      }
      const result = await registerPendingUser(context, data)
      ;({ phoneNumber, user } = result)

      expect(user).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        state: 'pending',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })

      expect(phoneNumber).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        hash: '531cac1ef11ff444d19958b44c90a9b3ac766221324517b044c744d5e8a01b2d',
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        phoneNumber: expect.stringContaining('+19282356681'),
        type: 'unclaimed',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    }, 20000)

    it('returns the existing user idempotently if one already exists', async () => {
      const data = {
        phoneNumber: '9282356681'
      }
      ;({ phoneNumber, user } = await registerPendingUser(context, data))
      const result = await registerPendingUser(context, data)

      expect(result.user).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        state: 'pending',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })

      expect(result.phoneNumber).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        hash: '531cac1ef11ff444d19958b44c90a9b3ac766221324517b044c744d5e8a01b2d',
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        phoneNumber: expect.stringContaining('+19282356681'),
        type: 'unclaimed',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    }, 20000)
  })
})
