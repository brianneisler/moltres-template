import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from 'moltres/test'

import { createUser, deleteUser } from '../../user'
import {
  createUserPreferences,
  deleteUserPreferences
} from '../../user_preferences'

import createPreference from './createPreference'
import deletePreference from './deletePreference'

const spec = describe('createPreference', () => {
  describe('ServiceAccount', () => {
    let context
    let result
    let adminContext
    let user
    let userPreferences

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(context, { state: 'pending' })
      userPreferences = await createUserPreferences(adminContext, {
        userId: user.id
      })
      result = null
    }, 20000)

    afterEach(async () => {
      try {
        if (result) {
          await deletePreference(adminContext, [userPreferences.id, result.id])
          result = undefined
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (userPreferences) {
          await deleteUserPreferences(adminContext, userPreferences.id)
          userPreferences = undefined
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (user) {
          await deleteUser(adminContext, user.id)
          user = undefined
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('can create a Preference', async () => {
      const data = {
        key: 'foobar',
        userPreferencesId: userPreferences.id,
        value: { foo: 'bar' }
      }
      result = await createPreference(context, data)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: 'foobar',
        key: 'foobar',
        removedAt: null,
        updatedAt: expect.any(context.firebase.firestore.Timestamp),
        userPreferencesId: userPreferences.id,
        value: { foo: 'bar' }
      })
    }, 20000)
  })
})
