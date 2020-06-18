import anyIdenticalWithAny from './anyIdenticalWithAny'
import arrayClone from './arrayClone'
import arrayGetIndex from './arrayGetIndex'

const arraySetIndex = (array, index, value) => {
  const current = arrayGetIndex(array, index)
  if (anyIdenticalWithAny(current, value) && index < array.length) {
    return array
  }
  const clone = arrayClone(array)
  clone[index] = value
  return clone
}

export default arraySetIndex
