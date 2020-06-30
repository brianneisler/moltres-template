import { call } from '../../utils/redux'
import { factoryAndWatchQuery } from '../../core'
import { invariant, isString } from '../../utils/lang'
import { refPageById } from '../../db/Page'
import enhancePage from './enhancePage'

const queryAndWatchPage = function* (context, { pageId }, { handler } = {}) {
  invariant(isString(pageId), 'pageId must be a String')

  return yield call(factoryAndWatchQuery, {
    context,
    createQuery: refPageById,
    enhancer: enhancePage,
    initialState: { ids: pageId },
    queryKey: `Page.${pageId}`,
    watcherOptions: { handler }
  })
}

export default queryAndWatchPage
