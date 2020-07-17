import anyIsResolved from './anyIsResolved'
import unresolvedResolveWith from './unresolvedResolveWith'

const resolveNext = (next, iterator, func, recur) =>
  unresolvedResolveWith(next, (resolvedNext) => {
    if (resolvedNext.done) {
      return resolvedNext.value
    }
    return recur(iterator, func)
  })

const iteratorIterate = (iterator, func) => {
  while (true) {
    let next = iterator.next()
    if (!anyIsResolved(next)) {
      return unresolvedResolveWith(next, (resolvedNext) => {
        next = func(resolvedNext)
        if (!anyIsResolved(next)) {
          return resolveNext(next, iterator, func, iteratorIterate)
        }
        if (next.done) {
          return next.value
        }
        return iteratorIterate(iterator, func)
      })
    }
    next = func(next)
    if (!anyIsResolved(next)) {
      return resolveNext(next, iterator, func, iteratorIterate)
    }
    if (next.done) {
      return next.value
    }
  }
}

export default iteratorIterate
