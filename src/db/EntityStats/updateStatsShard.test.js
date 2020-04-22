import { User, createUser, deleteUser } from '../User'
import { map, prop, range } from 'ramda'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import deleteEntityStats from './deleteEntityStats'
import findOrCreateEntityStats from './findOrCreateEntityStats'
import refEntityStatsById from './refEntityStatsById'
import updateStatsShard from './updateStatsShard'

const spec = describe('updateStatsShard', () => {
  let adminContext
  beforeAll(async () => {
    adminContext = await setupTestAdminContext(spec)
  }, 20000)

  afterAll(async () => {
    adminContext = await tearDownTestAdminContext(adminContext)
  })

  describe('ServiceAccount', () => {
    let context
    let entityStats
    let user
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(adminContext, {
        name: 'test-user',
        state: 'pending'
      })
      entityStats = await findOrCreateEntityStats(context, {
        entityId: user.id,
        entityType: User.name
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
        if (entityStats) {
          await deleteEntityStats(adminContext, prop('id', entityStats))
        }
      } catch (error) {
        context.logger.error(error)
      }

      context = await tearDownTestServiceAccountContext(context)
    })

    it('update StatsShard at speed', async () => {
      const ref = refEntityStatsById(context, entityStats.id)
      const shardIndex = 0
      const increment = context.firebase.firestore.FieldValue.increment(1)

      const results = await Promise.all(
        map(async () => {
          return await updateStatsShard(
            {
              ...context,
              parentRef: ref
            },
            shardIndex,
            {
              'data.foo': increment
            }
          )
        }, range(0, 100))
      )

      expect(results[99]).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        data: {
          foo: 100
        },
        id: '0',
        index: 0,
        removedAt: null,
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    }, 20000)
  })
})