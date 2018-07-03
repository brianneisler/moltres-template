import { asyncChannel, call, fork, handleAction, watchChannel } from 'moltres'
import { httpRequest } from './actions'
import { addRoute, removeRoute } from './util'

const route = function*(path, method, handler) {
  const channel = yield* asyncChannel(function*(emitter) {
    const channelRoute = {
      path,
      method,
      handler: (req, res) => emitter({ req, res })
    }
    yield call(addRoute, channelRoute)

    return function*() {
      yield call(removeRoute, channelRoute)
    }
  })

  const wrappedHandler = handleAction(handler)
  yield fork(watchChannel, channel, function*({ req, res }) {
    const event = httpRequest({
      body: req.body,
      headers: req.headers,
      host: req.hostname,
      ip: req.ip,
      params: req.params,
      path: req.path,
      query: req.query,
      route: req.route
    })
    const response = yield call(wrappedHandler, event)
    // { statusCode, headers, body }

    res.writeHead(response.statusCode, response.headers)
    res.end(response.body)
  })
}

export default route
