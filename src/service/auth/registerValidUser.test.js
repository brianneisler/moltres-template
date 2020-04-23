import { deleteAction } from '../../db/Action'
import { deleteUser } from '../../db/User'
import { deleteUserPhoneNumber } from '../../db/UserPhoneNumber'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import registerPendingUser from './registerPendingUser'
import registerValidUser from './registerValidUser'

const spec = describe('registerValidUser', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let action
    let context
    let user
    let phoneNumber

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
    })

    afterEach(async () => {
      try {
        await deleteAction(context, action.action.type, action.action.id)
      } catch (error) {
        context.logger.error(error)
      }
      try {
        await deleteUserPhoneNumber(context, phoneNumber.id)
      } catch (error) {
        context.logger.error(error)
      }
      try {
        await deleteUser(context, user.id)
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    })

    it('can register a User that does not previously exist', async () => {
      const data = {
        phoneNumber: '9282356681'
      }
      const result = await registerValidUser(context, data)
      ;({ action, phoneNumber, user } = result)

      expect(user).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        state: 'valid',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })

      expect(action).toEqual({
        action: {
          id: expect.stringMatching(
            /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/
          ),
          payload: expect.objectContaining({
            data: expect.objectContaining({
              phoneNumberId: phoneNumber.id
            }),
            method: 'sms',
            userId: user.id
          }),
          source: expect.any(String),
          specversion: '0.3-wip',
          time: expect.any(String),
          type: 'USER_REGISTERED'
        },
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })

      expect(phoneNumber).toEqual({
        createdAt: expect.objectContaining({
          nanoseconds: expect.any(Number),
          seconds: expect.any(Number)
        }),
        hash: '531cac1ef11ff444d19958b44c90a9b3ac766221324517b044c744d5e8a01b2d',
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        phoneNumber: expect.stringContaining('+19282356681'),
        type: 'user',
        updatedAt: expect.objectContaining({
          nanoseconds: expect.any(Number),
          seconds: expect.any(Number)
        })
      })
    }, 20000)

    it('can register a User that does not previously exist', async () => {
      const data = {
        phoneNumber: '9282356681'
      }
      const result = await registerValidUser(context, data)
      ;({ action, phoneNumber, user } = result)

      expect(user).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        state: 'valid',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })

      expect(action).toEqual({
        action: {
          id: expect.stringMatching(
            /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/
          ),
          payload: expect.objectContaining({
            data: expect.objectContaining({
              phoneNumberId: phoneNumber.id
            }),
            method: 'sms',
            userId: user.id
          }),
          source: expect.any(String),
          specversion: '0.3-wip',
          time: expect.any(String),
          type: 'USER_REGISTERED'
        },
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })

      expect(phoneNumber).toEqual({
        createdAt: expect.objectContaining({
          nanoseconds: expect.any(Number),
          seconds: expect.any(Number)
        }),
        hash: '531cac1ef11ff444d19958b44c90a9b3ac766221324517b044c744d5e8a01b2d',
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        phoneNumber: expect.stringContaining('+19282356681'),
        type: 'user',
        updatedAt: expect.objectContaining({
          nanoseconds: expect.any(Number),
          seconds: expect.any(Number)
        })
      })
    }, 20000)

    it('upgrades a pending User to a valid one', async () => {
      const data = {
        phoneNumber: '9282356681'
      }
      ;({ phoneNumber, user } = await registerPendingUser(context, data))

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
      ;({ action, phoneNumber, user } = await registerValidUser(context, data))

      expect(user).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        state: 'valid',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })

      expect(action).toEqual({
        action: {
          id: expect.stringMatching(
            /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/
          ),
          payload: expect.objectContaining({
            data: expect.objectContaining({
              phoneNumberId: phoneNumber.id
            }),
            method: 'sms',
            userId: user.id
          }),
          source: expect.any(String),
          specversion: '0.3-wip',
          time: expect.any(String),
          type: 'USER_REGISTERED'
        },
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })

      expect(phoneNumber).toEqual({
        createdAt: expect.objectContaining({
          nanoseconds: expect.any(Number),
          seconds: expect.any(Number)
        }),
        hash: '531cac1ef11ff444d19958b44c90a9b3ac766221324517b044c744d5e8a01b2d',
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        phoneNumber: expect.stringContaining('+19282356681'),
        type: 'user',
        updatedAt: expect.objectContaining({
          nanoseconds: expect.any(Number),
          seconds: expect.any(Number)
        })
      })
    }, 20000)
  })
})
