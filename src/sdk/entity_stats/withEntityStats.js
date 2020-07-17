import {
  compose,
  createSelector,
  getProp,
  invariant,
  isString,
  map,
  mergeDeepCount,
  values
} from '../../utils/lang'
import {
  queryEntityStats,
  queryStatsShards,
  refEntityStatsById
} from '../../db/EntityStats'
import { withQuery, withSelectedProps } from '../../core'

const withEntityStats = ({
  entityIdPath,
  entityTypePath,
  statsEntityType,
  statsStatePath
}) => {
  invariant(isString(entityIdPath), 'entityIdPath must be a String')
  invariant(
    isString(entityTypePath) || isString(statsEntityType),
    'entityTypePath OR statsEntityType must be a String'
  )
  invariant(
    isString(statsStatePath),
    'statsStatePath OR statsEntityType must be a String'
  )

  return compose(
    withQuery({
      createQuery: (context, { entityId, entityType }, queryOptions) => {
        if (entityType && entityId) {
          return queryEntityStats(
            context,
            { entityId, entityType },
            queryOptions
          )
        }
        return null
      },
      queryExtensions: { findOne: true },
      selector: entityTypePath
        ? createSelector(
            [entityIdPath, entityTypePath],
            (entityId, entityType) => ({
              entityId,
              entityType
            })
          )
        : createSelector([entityIdPath], (entityId) => ({
            entityId,
            entityType: statsEntityType
          })),
      statePath: statsStatePath
    }),
    withQuery({
      createQuery: (context, { statsId }, queryOptions) => {
        if (statsId) {
          return queryStatsShards(
            {
              ...context,
              parentRef: refEntityStatsById(context, statsId, queryOptions)
            },
            {},
            {}
          )
        }
        return null
      },
      selector: createSelector(`${statsStatePath}.id`, (statsId) => ({
        statsId
      })),
      statePath: `${statsStatePath}.shards`
    }),
    withSelectedProps([`${statsStatePath}.shards`], {
      [`${statsStatePath}.data`]: (context, shards) => {
        return mergeDeepCount(map(getProp('data'), values(shards)))
      }
    })
  )
}

export default withEntityStats
