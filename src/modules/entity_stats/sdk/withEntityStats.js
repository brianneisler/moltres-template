import { withQuery, withSelectedProps } from 'moltres/core'
import {
  compose,
  createSelector,
  getProperty,
  invariant,
  isString,
  map,
  mergeDeepCount,
  values
} from 'moltres/lang'

import queryEntityStats from './queryEntityStats'
import queryStatsShards from './queryStatsShards'
import refEntityStatsById from './refEntityStatsById'

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
        return mergeDeepCount(map(getProperty('data'), values(shards)))
      }
    })
  )
}

export default withEntityStats
