import { withQuery } from '../../core'
import { queryPageContents } from '../../db/PageContent'
import { compose, createSelector, curry, weakMemoize } from '../../utils/lang'

const enhancePage = curry(
  weakMemoize((statePath) =>
    compose(
      withQuery({
        createQuery: (context, { pageId }, queryOptions) => {
          if (pageId) {
            return queryPageContents(
              context,
              { pageId, published: true },
              queryOptions
            )
              .orderBy('version', 'desc')
              .limit(1)
          }
          return null
        },
        queryExtensions: { findOne: true },
        selector: createSelector([`${statePath}.id`], (pageId) => ({
          pageId
        })),
        statePath: `${statePath}.pageContent`
      })
    )
  )
)

export default enhancePage
