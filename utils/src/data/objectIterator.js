import arrayIterator from './arrayIterator'
import objectKeys from './objectKeys'

const objectIterator = (object) => {
  const keyIterator = arrayIterator(objectKeys(object))
  return {
    next: () => {
      const { done, value } = keyIterator.next()
      if (done) {
        return { done, value }
      }
      return {
        done,
        kdx: value,
        key: value,
        value: object[value]
      }
    }
  }
}

export default objectIterator
