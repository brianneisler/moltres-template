import arrayFilter from './arrayFilter'
import objectGetOwnPropertyDescriptor from './objectGetOwnPropertyDescriptor'
import objectGetOwnPropertySymbols from './objectGetOwnPropertySymbols'

const objectSymbols = (object) => {
  const ownSymbols = objectGetOwnPropertySymbols(object)
  return arrayFilter(ownSymbols, (symbol) => {
    const descriptor = objectGetOwnPropertyDescriptor(object, symbol)
    return !!descriptor.enumerable
  })
}

export default objectSymbols
