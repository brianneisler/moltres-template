import { createSelector } from '../utils/lang'

import createQueryFactory from './createQueryFactory'
import generateEngine from './generateEngine'
import runSaga from './runSaga'

describe('createQueryFactory', () => {
  test('correctly creates an engine with no modules', async () => {
    // eslint-disable-next-line no-unused-vars
    const createQuery = jest.fn((context, props, queryOptions) => null)
    // eslint-disable-next-line no-unused-vars
    const enhancer = jest.fn(() => (baseFactory) => (state, channel, context) =>
      baseFactory(state, channel, context)
    )
    const factory = jest.fn((state) => state)
    const queryExtensions = {}
    const queryOptions = {}
    const selector = createSelector(['barId', 'bazId'], (barId, bazId) => ({
      barId,
      bazId
    }))
    const statePath = '$.foo'

    const queryFactory = createQueryFactory({
      createQuery,
      enhancer,
      factory,
      queryExtensions,
      queryOptions,
      selector,
      statePath
    })

    expect(queryFactory).toBeInstanceOf(Function)

    const initialState = { barId: 'id1', bazId: 'id2' }
    const channel = { put: jest.fn() }
    const context = { logger: console }
    const engine = generateEngine({}, context)

    const result = await runSaga(
      engine,
      queryFactory,
      initialState,
      channel,
      context
    )

    expect(result).toEqual({
      barId: 'id1',
      bazId: 'id2',
      foo: {}
    })
    expect(createQuery).toHaveBeenCalledWith(
      context,
      { barId: 'id1', bazId: 'id2' },
      queryOptions
    )
  })
})
