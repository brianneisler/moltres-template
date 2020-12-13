import { getProperty } from 'moltres'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from 'moltres/test'

import { createUser, deleteUser } from '../../user'

import createUserPreferences from './createUserPreferences'
import deleteUserPreferences from './deleteUserPreferences'

const spec = describe('createUserPreference', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let result
    let user
    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(context, { state: 'pending' })
      result = null
    }, 20000)

    afterEach(async () => {
      try {
        if (result) {
          await deleteUserPreferences(adminContext, getProperty('id', result))
          result = undefined
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

    it('can create a UserPreference', async () => {
      const data = {
        userId: user.id
      }
      result = await createUserPreferences(context, data)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: user.id,
        removedAt: null,
        updatedAt: expect.any(context.firebase.firestore.Timestamp),
        userId: user.id
      })
    })
  })
})
