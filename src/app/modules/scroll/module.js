import { Scroll } from '../../../constants'
import { assocPath, map, values } from 'moltres/lang'
import {
  all,
  fork,
  handleActions,
  put,
  select,
  take,
  takeEvery,
  takeLatest
} from 'moltres/redux'
import {
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getWindow
} from 'moltres/web'
import {
  preloadAction,
  preloadCompleteAction,
  selectRouterLocationPathname
} from '../router'

import * as actions from './actions'
import selectScrollPathname from './selectScrollPathname'
import selectScrollTarget from './selectScrollTarget'
import { monitorScroll } from './util'

const getDistanceFromBottom = (element) =>
  getScrollHeight(element) - (getClientHeight(element) + getScrollTop(element))

const mod = () => ({
  reducer: handleActions(
    {
      [actions.scrollEvent]: (state, { payload }) => {
        const { name, target } = payload
        state = assocPath(
          ['targets', name],
          {
            distanceFromBottom: getDistanceFromBottom(target),
            scrollTop: getScrollTop(target),
            target
          },
          state
        )
        return state
      },
      [actions.setScrollPathnameTarget]: (state, { payload }) => {
        const { pathname, target } = payload
        state = assocPath(
          ['pathnames', pathname, 'targets', target.name],
          target,
          state
        )
        return state
      }
    },
    {
      window: {
        distanceFromBottom: getDistanceFromBottom(getWindow()),
        scrollTop: getScrollTop(getWindow()),
        target: getWindow()
      }
    }
  ),
  *run() {
    yield fork(monitorScroll, getWindow(), 'window')

    yield takeLatest(actions.scrollEvent, function* (action) {
      const { name, target } = action.payload
      const pathname = yield select(selectRouterLocationPathname)
      const scrollTop = getScrollTop(target)
      yield put(
        actions.setScrollPathnameTarget({
          pathname,
          target: {
            name,
            scrollTop
          }
        })
      )
    })

    yield takeEvery(preloadAction, function* ({ payload }) {
      const { location } = payload
      const pathnameScroll = yield select(
        selectScrollPathname(location.pathname)
      )
      if (pathnameScroll) {
        yield take(preloadCompleteAction)
        yield all(
          map((target) => {
            // NOTE BRN: If window scroll is less than page top (51) then scroll to 51
            let { scrollTop } = target
            if (target.name === 'window' && scrollTop < Scroll.PAGE_TOP) {
              scrollTop = Scroll.PAGE_TOP
            }
            return put(
              actions.scrollTo({
                behavior: 'auto',
                name: target.name,
                top: scrollTop
              })
            )
          }, values(pathnameScroll.targets))
        )
      } else {
        // NOTE BRN: if pathnameScroll doesn't exist then this is the first
        // visit to this page during this session. We should always start the
        // scroll at the top
        yield put(
          actions.scrollTo({
            behavior: 'auto',
            name: 'window',
            top: Scroll.PAGE_TOP // hide the WAT duck
          })
        )
      }
    })

    yield takeEvery(actions.scrollTo, function* (action) {
      const { behavior, left, name, top } = action.payload
      const scroll = yield select(selectScrollTarget(name))
      if (scroll) {
        scroll.target.scrollTo({
          behavior,
          left,
          top
        })
      }
    })
  }
})

export default mod
