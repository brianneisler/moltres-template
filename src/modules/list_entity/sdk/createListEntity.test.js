import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../../test'
import { Image } from '../../image/schemas'
import { createImage, deleteImage } from '../../image/sdk'
import { createList, deleteList } from '../../list/sdk'
import { createUser, deleteUser } from '../../user/sdk'

import createListEntity from './createListEntity'
import deleteListEntity from './deleteListEntity'

const spec = describe('createList', () => {
  describe('ServiceAccount', () => {
    let context
    let result
    let adminContext
    let user
    let list
    let entity
    let image

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(adminContext, { state: 'pending' })
      list = await createList(adminContext, {})
      const imageData = {
        contentType: 'image/jpeg',
        hash: '6c6d079d5711b57ce0af901b000be888',
        height: 0,
        length: 0,
        path: '/path/to/image.jpeg',
        storageBucket: 'fitpath-test.appspot.com',
        width: 0
      }
      image = await createImage(adminContext, imageData)
    })

    afterEach(async () => {
      try {
        if (result) {
          await deleteListEntity(adminContext, result.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (image) {
          await deleteImage(adminContext, image.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (list) {
          await deleteList(adminContext, list.id)
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

    it('can create a ListEntity', async () => {
      const data = {
        entityId: entity.id,
        entityType: Image.name,
        index: 11,
        listId: list.id
      }
      result = await createListEntity(adminContext, data)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        entityId: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        entityType: expect.stringMatching(Image.name),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        index: expect.any(Number),
        listId: list.id,
        removedAt: null,
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    })
  })
})
