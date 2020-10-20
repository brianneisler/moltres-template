import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../../test'
import { createConversation, deleteConversation } from '../../conversation'
import {
  createConversationMember,
  deleteConversationMember
} from '../../conversation_member'
import { ConversationMemberRoles } from '../../conversation_member/constants'
import { createUser, deleteUser } from '../../user'

import createConversationMessage from './createConversationMessage'
import deleteConversationMessage from './deleteConversationMessage'

const spec = describe('createMessage', () => {
  describe('ServiceAccount', () => {
    let context
    let result
    let user
    let conversation
    let conversationMember
    let adminContext
    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(context, {
        state: 'pending'
      })
      conversation = await createConversation(context, {
        visibility: 'PUBLIC'
      })
      conversationMember = await createConversationMember(context, {
        conversationId: conversation.id,
        role: ConversationMemberRoles.OWNER,
        userId: user.id
      })
    }, 20000)

    afterEach(async () => {
      try {
        if (result) {
          await deleteConversationMessage(adminContext, [
            conversation.id,
            result.id
          ])
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (conversationMember) {
          await deleteConversationMember(adminContext, [
            conversation.id,
            conversationMember.id
          ])
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
      try {
        if (user) {
          await deleteUser(adminContext, user.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    })

    it('can create a ConversationMessage', async () => {
      const data = {
        attachments: null,
        conversationId: conversation.id,
        editedAt: null,
        sentAt: null,
        text: 'test message',
        type: 'message',
        userId: user.id
      }
      result = await createConversationMessage(context, data)
      expect(result).toEqual({
        attachments: null,
        conversationId: conversation.id,
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        editedAt: null,
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        removedAt: null,
        sentAt: null,
        text: 'test message',
        type: 'message',
        updatedAt: expect.any(context.firebase.firestore.Timestamp),
        userId: user.id
      })
    }, 20000)
  })
})
