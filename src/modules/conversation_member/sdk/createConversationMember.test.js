// import { createUser, deleteUser } from '../User'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../../test'
import { createConversation, deleteConversation } from '../../conversation'
import { createUser, deleteUser } from '../../user'
import { ConversationMemberRoles } from '../constants'

import createConversationMember from './createConversationMember'
import deleteConversationMember from './deleteConversationMember'

const spec = describe('createConversationMember', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let conversation
    let result
    let user

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      conversation = await createConversation(context, {
        visibility: 'PUBLIC'
      })
      user = await createUser(context, {
        state: 'pending'
      })
    }, 20000)

    afterEach(async () => {
      try {
        if (result) {
          await deleteConversationMember(adminContext, [
            conversation.id,
            result.id
          ])
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (user) {
          await deleteUser(adminContext, user.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (conversation) {
          await deleteConversation(adminContext, conversation.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    })

    it('can create a ConversationMember', async () => {
      const data = {
        conversationId: conversation.id,
        role: ConversationMemberRoles.OWNER,
        userId: user.id
      }
      result = await createConversationMember(context, data)
      expect(result).toEqual({
        conversationId: conversation.id,
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        removedAt: null,
        role: ConversationMemberRoles.OWNER,
        updatedAt: expect.any(context.firebase.firestore.Timestamp),
        userId: user.id
      })
    }, 20000)
  })
})
