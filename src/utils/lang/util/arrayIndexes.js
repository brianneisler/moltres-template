import arrayIndexIterator from './arrayIndexIterator'
import iteratorToArray from './iteratorToArray'

const arrayIndexes = (array) => iteratorToArray(arrayIndexIterator(array))

export default arrayIndexes
