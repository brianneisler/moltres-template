import assoc from './assoc'
import contagion from './contagion'
import curry from './curry'
import getProp from './getProp'
import keys from './keys'
import pipe from './pipe'
import reduce from './reduce'

const map = curry((iteratee, collection) => {
  return reduce(
    (accum, key) => {
      return pipe(
        () => iteratee(getProp(key, collection), key, collection),
        (result) => assoc(key, result, accum)
      )()
    },
    contagion(collection),
    keys(collection)
  )
})

export default map
