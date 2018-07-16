// import identity from './identity'
// import isGenerator from './isGenerator'
// import isPromise from './isPromise'
//
// const resolveGenerator = function* (generator, callback) {
//   const result = yield* generator
//   return callback(result)
// }
//
// const resolveAll = (collection, callback = identity) => {
//   // if (isPromise(value)) {
//   //   return value.then((result) => resolve(result, callback))
//   // }
//   // if (isGenerator(value)) {
//   //   return resolveGenerator(value, (result) => resolve(result, callback))
//   // }
//   // return callback(value)
//   if (isArrayLike(collection)) {
//     const { length } = collectoion
//     let idx = 0
//     while (idx < len) {
//       fn(collection[idx])
//       idx += 1
//     }
//   }
//
//
// }

const resolveAll = () => {
  throw new Error('not yet implemented')
}

export default resolveAll
