import { User, createUser, deleteUser } from '../User'
import { forEach, map, prop, range } from 'ramda'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import deleteEntityStats from './deleteEntityStats'
import incrementEntityStat from './incrementEntityStat'

const spec = describe('incrementEntityStat', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let result
    let user

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(adminContext, {
        name: 'test-user',
        state: 'pending'
      })
      result = null
    }, 20000)

    afterEach(async () => {
      try {
        if (user) {
          await deleteUser(adminContext, prop('id', user))
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (result) {
          await deleteEntityStats(adminContext, prop('id', result))
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('can increment a new entity stat', async () => {
      result = await incrementEntityStat(context, {
        entityId: user.id,
        entityType: User.name,
        stat: 'foo'
      })
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        entityId: user.id,
        entityType: User.name,
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        numberShards: 1,
        removedAt: null,
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    }, 20000)

    it('can increment an entity stat at speed', async () => {
      const results = await Promise.all(
        map(async () => {
          return incrementEntityStat(context, {
            entityId: user.id,
            entityType: User.name,
            stat: 'foo'
          })
        }, range(0, 10))
      )

      result = results[0]

      forEach((rslt) => {
        expect(rslt).toEqual({
          createdAt: expect.any(context.firebase.firestore.Timestamp),
          entityId: user.id,
          entityType: User.name,
          id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
          numberShards: 1,
          removedAt: null,
          updatedAt: expect.any(context.firebase.firestore.Timestamp)
        })
      }, results)
    }, 20000)
  })
})
