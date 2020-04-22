import { createUser, deleteUser } from '../User'
import { prop } from 'ramda'
import {
  setupTestAdminContext,
  setupTestAnonymousContext,
  setupTestServiceAccountContext,
  setupTestValidUserContext,
  tearDownTestAdminContext,
  tearDownTestAnonymousContext,
  tearDownTestServiceAccountContext,
  tearDownTestValidUserContext
} from '../../test'
import createAccessToken from './createAccessToken'
import deleteAccessToken from './deleteAccessToken'
import removeAccessToken from './removeAccessToken'
import uuidv4 from 'uuid/v4'

const spec = describe('removeAccessToken', () => {
  let adminContext
  beforeAll(async () => {
    adminContext = await setupTestAdminContext(spec)
  })

  afterAll(async () => {
    adminContext = await tearDownTestAdminContext(adminContext)
  })

  describe('ServiceAccount', () => {
    let accessToken
    let context
    let user
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(context, {
        name: 'test-user',
        state: 'pending'
      })
      accessToken = await createAccessToken(context, {
        token: uuidv4(),
        userId: user.id,
        valid: true
      })
    })

    afterEach(async () => {
      try {
        if (user) {
          await deleteUser(adminContext, prop('id', user))
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (accessToken) {
          await deleteAccessToken(adminContext, prop('id', accessToken))
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
    })

    it('can remove an AccessToken', async () => {
      const ref = await removeAccessToken(context, accessToken.id)
      const doc = await ref.get()
      expect(doc.data()).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        // id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        removedAt: expect.any(context.firebase.firestore.Timestamp),
        removedByEntityId: adminContext.serviceAccount.id,
        removedByEntityType: 'ServiceAccount',
        token: accessToken.token,
        updatedAt: expect.any(context.firebase.firestore.Timestamp),
        userId: user.id,
        valid: accessToken.valid
      })
    })
  })

  describe('Valid user', () => {
    let accessToken
    let context
    let user
    let userContext
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
      userContext = await setupTestValidUserContext(adminContext, context)
      user = await createUser(context, {
        name: 'test-user',
        state: 'pending'
      })
      accessToken = await createAccessToken(context, {
        token: uuidv4(),
        userId: user.id,
        valid: true
      })
    }, 10000)

    afterEach(async () => {
      try {
        if (user) {
          await deleteUser(adminContext, prop('id', user))
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (accessToken) {
          await deleteAccessToken(adminContext, prop('id', accessToken))
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      userContext = await tearDownTestValidUserContext(context, userContext)
    })

    it('throws an error when removing an AccessToken', async () => {
      await expect(removeAccessToken(userContext, accessToken.id)).rejects.toThrow(
        /Missing or insufficient permissions/
      )
    }, 10000)
  })

  describe('Anonymous user', () => {
    let anonymousContext
    let accessToken
    let testContext
    let user
    beforeEach(async () => {
      testContext = await setupTestServiceAccountContext(adminContext)
      anonymousContext = await setupTestAnonymousContext(adminContext, testContext)
      user = await createUser(testContext, {
        name: 'test-user',
        state: 'pending'
      })
      accessToken = await createAccessToken(testContext, {
        token: uuidv4(),
        userId: user.id,
        valid: true
      })
    })

    afterEach(async () => {
      try {
        if (user) {
          await deleteUser(adminContext, prop('id', user))
        }
      } catch (error) {
        testContext.logger.error(error)
      }
      try {
        if (accessToken) {
          await deleteAccessToken(adminContext, prop('id', accessToken))
        }
      } catch (error) {
        testContext.logger.error(error)
      }
      testContext = await tearDownTestServiceAccountContext(testContext)
      anonymousContext = await tearDownTestAnonymousContext(anonymousContext)
    })

    it('throws an error when trying to remove an AccessToken', async () => {
      await expect(removeAccessToken(anonymousContext, accessToken.id, {})).rejects.toThrow(
        /Missing or insufficient permissions/
      )
    }, 10000)
  })
})
