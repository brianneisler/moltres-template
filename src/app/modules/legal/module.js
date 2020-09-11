import { withConfig, withContext } from '../../../core'
import { getPageByPath } from '../../../db/Page'
import { queryAndWatchPage } from '../../../sdk/page'
import { compose } from '../../../utils/lang'
import { call } from '../../../utils/redux'

const enhance = compose(withConfig(), withContext())
const mod = () => ({
  routes: [
    {
      exact: true,
      *handle(context, response, { match }) {
        yield call(getPageByPath, context, match.path)
        return { statusCode: 200 }
      },
      path: '/legal/privacy',
      preload: enhance(function* (context, { first, match }) {
        if (first) {
          yield call(queryAndWatchPage, context, { path: match.path })
        }
      })
    },
    {
      exact: true,
      *handle(context, response, { match }) {
        yield call(getPageByPath, context, match.path)
        return { statusCode: 200 }
      },
      path: '/legal/privacy',
      preload: enhance(function* (context, { first, match }) {
        if (first) {
          yield call(queryAndWatchPage, context, { path: match.path })
        }
      })
    },
    {
      exact: true,
      handle: () => ({
        redirect: '/legal/terms',
        statusCode: 301
      }),
      path: '/legal'
    }
  ]
})

export default mod
