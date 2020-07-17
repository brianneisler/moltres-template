import { call } from '../../utils/redux'
import { factoryAndWatchQuery } from '../../core'
import { invariant, isString } from '../../utils/lang'
import { queryPages, refPageById } from '../../db/Page'
import enhancePage from './enhancePage'

const queryAndWatchPage = function* (
  context,
  { pageId, path },
  { handler } = {}
) {
  invariant(
    isString(pageId) || isString(path),
    'pageId or path must be a String'
  )

  if (pageId) {
    return yield call(factoryAndWatchQuery, {
      context,
      createQuery: refPageById,
      enhancer: enhancePage,
      initialState: { ids: pageId },
      queryKey: `Page.${pageId}`,
      watcherOptions: { handler }
    })
  }

  if (path) {
    return yield call(factoryAndWatchQuery, {
      context,
      createQuery: queryPages,
      enhancer: enhancePage,
      initialState: { path },
      queryKey: `Page.path.${path}`,
      watcherOptions: { handler }
    })
  }
}

export default queryAndWatchPage
