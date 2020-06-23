import { anySatisfiesKeyed, anyToIterator, keyedToKeyedIterator } from './util'

const iterator = (any) => {
  if (anySatisfiesKeyed(any)) {
    return keyedToKeyedIterator(any)
  }
  return anyToIterator(any)
}

export default iterator
