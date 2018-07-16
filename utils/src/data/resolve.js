// NOTE BRN
// This doesn't work because redux-saga doesn't resolve generators that are
// returned from promises. Therefore if you started with a promise and then
// later resolved to a generator the function would fail. You basically always
// have to resolve a generator regardless of possible outcome since you can't
// predict what something might resolve to in the future.

// import identity from './identity'
// import isGenerator from './isGenerator'
// import isPromise from './isPromise'
//
// const resolveGenerator = function* (generator, callback) {
//   const result = yield* generator
//   return callback(result)
// }
//
// const resolve = (value, callback = identity) => {
//   if (isPromise(value)) {
//     return value.then((result) => resolve(result, callback))
//   }
//   if (isGenerator(value)) {
//     return resolveGenerator(value, (result) => resolve(result, callback))
//   }
//   return callback(value)
// }
//

const resolve = () => {
  throw new Error('not yet implemented')
}

export default resolve
