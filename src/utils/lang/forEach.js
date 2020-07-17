import curry from './curry'
import iterate from './iterate'
import pipe from './pipe'

const forEach = curry((func, iterable) =>
  pipe(
    () =>
      iterate(
        (next) =>
          pipe(
            (pNext) => {
              if (pNext.done) {
                return pNext
              }
              return func(pNext.value, pNext.kdx, iterable)
            },
            () => next
          )(next),
        iterable
      ),
    () => iterable
  )()
)

export default forEach
