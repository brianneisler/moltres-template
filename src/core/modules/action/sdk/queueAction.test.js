// import { createUser, deleteUser } from '../User'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../../../test'
import { emptyAction } from '../actions'
import { EmptyAction } from '../schemas'

import deleteAction from './deleteAction'
import queueAction from './queueAction'

const spec = describe('createConversation', () => {
  describe('ServiceAccount', () => {
    let context
    let result
    let adminContext
    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
    }, 20000)

    afterEach(async () => {
      try {
        if (result) {
          await deleteAction(adminContext, result.type, 'queue', result.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    })

    it('can queue an EmptyAction', async () => {
      result = await queueAction(EmptyAction, context, emptyAction(context))
      expect(result).toEqual({
        action: {
          id: result.id,
          payload: null,
          source: expect.any(String),
          specversion: '0.3-wip',
          time: expect.any(String),
          type: EmptyAction.name
        },
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(
          /^[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}$/
        ),
        removedAt: null,
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    }, 20000)
  })
})
