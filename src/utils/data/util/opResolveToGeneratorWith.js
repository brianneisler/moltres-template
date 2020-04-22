import anyResolveToGeneratorWith from './anyResolveToGeneratorWith'

const opResolveToGeneratorWith = function* (op, func) {
  const result = yield op
  return yield* anyResolveToGeneratorWith(result, func)
}

export default opResolveToGeneratorWith
