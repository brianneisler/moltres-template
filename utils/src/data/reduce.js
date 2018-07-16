export { reduce as default } from 'ramda'

// import bind from './bind'
// import isArrayLike from './isArrayLike'
// import isFunction from './isFunction'
// import isGenerator from './isGenerator'
// import isIterable from './isIterable'
// import isIterator from './isIterator'
// import isPromise from './isPromise'
// import iterator from './iterator'
// import resolve from './resolve'
// import xwrap from './xwrap'
//
//
// function arrayReduce(xf, acc, list) {
//   if (isPromise(acc)) {
//     return asyncArrayReduce(iteratee, acc, list)
//   } else if (isGenerator(acc)) {
//     return generatorReduceRight(iteratee, acc, list)
//   }
//   var idx = 0
//   var len = list.length
//   while (idx < len) {
//     acc = xf['@@transducer/step'](acc, list[idx])
//     if (acc && acc['@@transducer/reduced']) {
//       acc = acc['@@transducer/value']
//       break
//     }
//     idx += 1
//   }
//   return xf['@@transducer/result'](acc)
// }
//
// const iterableReduce = (xf, acc, iter) => {
//   var step = iter.next()
//   while (!step.done) {
//     acc = xf['@@transducer/step'](acc, step.value)
//     if (acc && acc['@@transducer/reduced']) {
//       acc = acc['@@transducer/value']
//       break
//     }
//     step = iter.next()
//   }
//   return xf['@@transducer/result'](acc)
// }
//
// const methodReduce = (xf, acc, obj, methodName) =>
//   xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc))
//
// const reduce = (iteratee, acc, list, options = { resolve: true }) => {
//   if (isFunction(iteratee)) {
//     iteratee = xwrap(iteratee)
//   }
//
//   let results
//   if (isArrayLike(list)) {
//     results = arrayReduce(iteratee, acc, list)
//   } else if (list != null && isFunction(list['fantasy-land/reduce'])) {
//     results = methodReduce(iteratee, acc, list, 'fantasy-land/reduce')
//   } else if (isIterable(list)) {
//     results = iterableReduce(iteratee, acc, iterator(list))
//   } else if (isIterator(list)) {
//     results = iterableReduce(iteratee, acc, list)
//   } else if (list != null && isFunction(list.reduce)) {
//     results = methodReduce(iteratee, acc, list, 'reduce')
//   } else {
//     throw new TypeError('reduce: list must be array or iterable')
//   }
//
//   if (options.resolve) {
//     return resolve(results)
//   }
//   return results
// }
//
// export default reduce
//

//
//
//
// import identity from './identity'
// import isArrayLike from './isArrayLike'
// import isGenerator from './isGenerator'
// import isIterator from './isIterator'
// import isObjectLike from './isObjectLike'
// import isPromise from './isPromise'
// import iterator from './iterator'
//
// const resolveGenerator = function* (generator, callback) {
//   const result = yield* generator
//   return callback(result)
// }
//
// const resolveToValue = (value, callback = identity) => {
//   if (isPromise(value)) {
//     return value.then((result) => resolveToValue(result, callback))
//   }
//   if (isGenerator(value)) {
//     return resolveGenerator(value, (result) => resolveToValue(result, callback))
//   }
//   return callback(value)
// }
//
// const resolveEach = (iter, array) => {
//   const { length } = array
//   let index = -1
//   //while ()
// }
//
// const resolveArrayLike = (array, recur) => {
//   return array
// }
//
// const resolveObjectLike = (object, recur) => {
//   return object
// }
//
// const resolveIterator = (iter, recur) => {
//   const values = []
//   let done = false
//   let value
//   while (!done) {
//     ({ done, value } = iter.next())
//     if (!done) {
//       values.push(value)
//     }
//   }
//   return recur(values, (resolvedValues) => iterator(resolvedValues))
// }
//
// const resolve = (value) =>
//   resolveToValue(value, (resolved) => {
//     console.log('resolved:', resolved)
//     if (isIterator(resolved)) {
//       return resolveIterator(resolved)
//     }
//     if (isArrayLike(resolved)) {
//       return resolveArrayLike(resolved)
//     }
//     if (isObjectLike(resolved)) {
//       return resolveObjectLike(resolved)
//     }
//     console.log('HERE resolved:', resolved)
//     return resolved
//   })
//
// export default resolve
