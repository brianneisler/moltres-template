import arrayConcat from './arrayConcat'
import objectKeys from './objectKeys'
import objectSymbols from './objectSymbols'

const objectProperties = (object) =>
  arrayConcat(objectKeys(object), objectSymbols(object))

export default objectProperties
