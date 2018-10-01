import isPromise from '../data/isPromise'
import isResolvable from './isResolvable'
import resolveToGenerator from './resolveToGenerator'

// NOTE BRN
// We have to do this because redux-saga doesn't resolve generators that are
// returned from promises. Therefore if you started with a promise and then
// later resolved to a generator the function would fail. You basically always
// have to resolve a generator regardless of possible outcome since you can't
// predict what something might resolve to in the future.

// This fixes that by wrapping effects in another generator that we can resolve
// and detect if an effect has resolved another generator. If so, we simple resolve
// the whole generator and let redux-saga pick it up again.

// NOTE BRN: This gives us a way of knowing when the generator has
// completed so that other async lines of exection can pick up on
// the completed generator and continue execution

const resolve = (value) => {
  if (isResolvable(value)) {
    if (isPromise(value)) {
      return value.then((resolved) => resolve(resolved))
    }
    return resolveToGenerator(value)
  }
  return value
}

export default resolve