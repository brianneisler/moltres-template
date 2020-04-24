import { ACCESS_DENIED } from '../../constants/Code'
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
import createUserProfile from './createUserProfile'
import deleteUserProfile from './deleteUserProfile'
import findUserProfileById from './findUserProfileById'
import removeUserProfile from './removeUserProfile'

const spec = describe('removeUserProfile', () => {
  let adminContext
  beforeAll(async () => {
    adminContext = await setupTestAdminContext(spec)
  })

  afterAll(async () => {
    adminContext = await tearDownTestAdminContext(adminContext)
  })

  describe('ServiceAccount', () => {
    let userProfile
    let context
    let user
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(context, {
        name: 'test-user',
        state: 'pending'
      })
      userProfile = await createUserProfile(context, {
        name: 'Mega WAT',
        userId: user.id
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
        if (userProfile) {
          await deleteUserProfile(adminContext, prop('id', userProfile))
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
    })

    it('can remove an UserProfile', async () => {
      const ref = await removeUserProfile(context, userProfile.id)
      const doc = await ref.get()
      expect(doc.data()).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        name: userProfile.name,
        removedAt: expect.any(context.firebase.firestore.Timestamp),
        removedByEntityId: adminContext.serviceAccount.id,
        removedByEntityType: 'ServiceAccount',
        updatedAt: expect.any(context.firebase.firestore.Timestamp),
        userId: user.id
      })
    })
  })

  describe('Owner user', () => {
    let userProfile
    let context
    let userContext
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
      userContext = await setupTestValidUserContext(adminContext, context)
      userProfile = await createUserProfile(context, {
        name: 'Mega WAT',
        userId: userContext.currentUser.id
      })
    }, 10000)

    afterEach(async () => {
      try {
        if (userProfile) {
          await deleteUserProfile(adminContext, prop('id', userProfile))
        }
      } catch (error) {
        context.logger.error(error)
      }
      userContext = await tearDownTestValidUserContext(context, userContext)
      context = await tearDownTestServiceAccountContext(context)
    })

    it('allows owner user to delete their own UserProfile', async () => {
      await removeUserProfile(userContext, userProfile.id)

      // NOTE: At this point only the ServiceAccount is allowed to access the
      // removed UserProfile
      expect(
        await findUserProfileById(context, userContext.currentUser.id, { includeRemoved: true })
      ).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        name: userProfile.name,
        removedAt: expect.any(context.firebase.firestore.Timestamp),
        removedByEntityId: userContext.currentUser.id,
        removedByEntityType: 'User',
        updatedAt: expect.any(context.firebase.firestore.Timestamp),
        userId: userContext.currentUser.id
      })

      await expect(findUserProfileById(userContext, userContext.currentUser.id)).rejects.toThrow(
        expect.objectContaining({
          code: ACCESS_DENIED
        })
      )
    }, 10000)
  })

  describe('Anonymous user', () => {
    let anonymousContext
    let userProfile
    let context
    let user
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
      anonymousContext = await setupTestAnonymousContext(adminContext, context)
      user = await createUser(context, {
        name: 'test-user',
        state: 'pending'
      })
      userProfile = await createUserProfile(context, {
        name: 'Mega WAT',
        userId: user.id
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
        if (userProfile) {
          await deleteUserProfile(adminContext, prop('id', userProfile))
        }
      } catch (error) {
        context.logger.error(error)
      }
      anonymousContext = await tearDownTestAnonymousContext(anonymousContext)
      context = await tearDownTestServiceAccountContext(context)
    })

    it('throws an error when trying to remove an UserProfile', async () => {
      await expect(removeUserProfile(anonymousContext, userProfile.id, {})).rejects.toThrow(
        expect.objectContaining({
          code: ACCESS_DENIED
        })
      )
    }, 10000)
  })
})
