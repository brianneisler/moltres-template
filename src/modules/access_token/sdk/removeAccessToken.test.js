import { getProperty } from 'moltres'
import {
  setupTestAdminContext,
  setupTestAnonymousContext,
  setupTestServiceAccountContext,
  setupTestValidUserContext,
  tearDownTestAdminContext,
  tearDownTestAnonymousContext,
  tearDownTestServiceAccountContext,
  tearDownTestValidUserContext
} from 'moltres/test'
import { v4 as uuidv4 } from 'uuid'

import { ACCESS_DENIED } from '../../../constants/Code'
import { createUser, deleteUser } from '../../user/sdk'

import createAccessToken from './createAccessToken'
import deleteAccessToken from './deleteAccessToken'
import removeAccessToken from './removeAccessToken'

const spec = describe('removeAccessToken', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let accessToken
    let context
    let user
    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
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
    }, 20000)

    afterEach(async () => {
      try {
        if (user) {
          await deleteUser(adminContext, getProperty('id', user))
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (accessToken) {
          await deleteAccessToken(adminContext, getProperty('id', accessToken))
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

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
    let adminContext
    let accessToken
    let context
    let user
    let userContext
    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
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
    }, 20000)

    afterEach(async () => {
      try {
        if (user) {
          await deleteUser(adminContext, getProperty('id', user))
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (accessToken) {
          await deleteAccessToken(adminContext, getProperty('id', accessToken))
        }
      } catch (error) {
        context.logger.error(error)
      }
      userContext = await tearDownTestValidUserContext(context, userContext)
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('throws an error when removing an AccessToken', async () => {
      await expect(
        removeAccessToken(userContext, accessToken.id)
      ).rejects.toThrow(
        expect.objectContaining({
          code: ACCESS_DENIED
        })
      )
    })
  })

  describe('Anonymous user', () => {
    let adminContext
    let anonymousContext
    let accessToken
    let testContext
    let user

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      testContext = await setupTestServiceAccountContext(adminContext)
      anonymousContext = await setupTestAnonymousContext(
        adminContext,
        testContext
      )
      user = await createUser(testContext, {
        name: 'test-user',
        state: 'pending'
      })
      accessToken = await createAccessToken(testContext, {
        token: uuidv4(),
        userId: user.id,
        valid: true
      })
    }, 20000)

    afterEach(async () => {
      try {
        if (user) {
          await deleteUser(adminContext, getProperty('id', user))
        }
      } catch (error) {
        testContext.logger.error(error)
      }
      try {
        if (accessToken) {
          await deleteAccessToken(adminContext, getProperty('id', accessToken))
        }
      } catch (error) {
        testContext.logger.error(error)
      }
      anonymousContext = await tearDownTestAnonymousContext(anonymousContext)
      testContext = await tearDownTestServiceAccountContext(testContext)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('throws an error when trying to remove an AccessToken', async () => {
      await expect(
        removeAccessToken(anonymousContext, accessToken.id, {})
      ).rejects.toThrow(
        expect.objectContaining({
          code: ACCESS_DENIED
        })
      )
    })
  })
})
