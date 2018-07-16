import isGenerator from './isGenerator'
import isPromise from './isPromise'
import slice from './slice'

const generatorReduceRight = function*(iteratee, accumulator, array) {
  if (isGenerator(accumulator)) {
    accumulator = yield* accumulator
  } else if (isPromise(accumulator)) {
    accumulator = yield accumulator
  }
  let length = array == null ? 0 : array.length
  while (length--) {
    accumulator = iteratee(accumulator, array[length], length)
    if (isGenerator(accumulator)) {
      accumulator = yield* accumulator
    } else if (isPromise(accumulator)) {
      accumulator = yield accumulator
    }
  }
  return accumulator
}

const asyncReduceRight = async (iteratee, accumulator, array) => {
  if (isPromise(accumulator)) {
    accumulator = await accumulator
  } else if (isGenerator(accumulator)) {
    return generatorReduceRight(iteratee, accumulator, array)
  }
  let length = array == null ? 0 : array.length
  while (length--) {
    accumulator = iteratee(accumulator, array[length], length)
    if (isPromise(accumulator)) {
      accumulator = await accumulator
    } else if (isGenerator(accumulator)) {
      return generatorReduceRight(iteratee, accumulator, slice(0, length, array))
    }
  }
  return accumulator
}

const reduceRight = (iteratee, accumulator, array) => {
  if (isPromise(accumulator)) {
    return asyncReduceRight(iteratee, accumulator, array)
  } else if (isGenerator(accumulator)) {
    return generatorReduceRight(iteratee, accumulator, array)
  }
  let length = array == null ? 0 : array.length
  while (length--) {
    accumulator = iteratee(accumulator, array[length], length)
    if (isPromise(accumulator)) {
      return asyncReduceRight(iteratee, accumulator, slice(0, length, array))
    } else if (isGenerator(accumulator)) {
      return generatorReduceRight(iteratee, accumulator, slice(0, length, array))
    }
  }
  return accumulator
}

export default reduceRight

// import bind from './bind'
// import isArrayLike from './isArrayLike'
// import isFunction from './isFunction'
// import isGenerator from './isGenerator'
// import isPromise from './isPromise'
// import slice from './slice'
// import xwrap from './xwrap'
//
// const symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator'
//
// const generatorReduceRight = function*(iteratee, acc, list) {
//   if (isGenerator(acc)) {
//     acc = yield* acc
//   } else if (isPromise(acc)) {
//     acc = yield acc
//   }
//   let length = list == null ? 0 : list.length
//   while (length--) {
//     acc = iteratee(acc, list[length], length)
//     if (isGenerator(acc)) {
//       acc = yield* acc
//     } else if (isPromise(acc)) {
//       acc = yield acc
//     }
//   }
//   return acc
// }
//
// const asyncReduceRight = async (iteratee, acc, list) => {
//   if (isPromise(acc)) {
//     acc = await acc
//   } else if (isGenerator(acc)) {
//     return generatorReduceRight(iteratee, acc, list)
//   }
//   let length = list == null ? 0 : list.length
//   while (length--) {
//     acc = iteratee(acc, list[length], length)
//     if (isPromise(acc)) {
//       acc = await acc
//     } else if (isGenerator(acc)) {
//       return generatorReduceRight(iteratee, acc, slice(0, length, list))
//     }
//   }
//   return acc
// }
//
// const arrayReduceRight = (xf, acc, list) => {
//   let length = list == null ? 0 : list.length
//   while (length--) {
//     acc = iteratee(acc, list[length], length)
//     if (isPromise(acc)) {
//       return asyncReduceRight(iteratee, acc, slice(0, length, list))
//     } else if (isGenerator(acc)) {
//       return generatorReduceRight(iteratee, acc, slice(0, length, list))
//     }
//   }
//   return acc
// }
//
// const methodReduceRight = (xf, acc, obj, methodName) =>
//   xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc))
//
// const reduceRight = (iteratee, acc, list) => {
//   if (isFunction(iteratee)) {
//     iteratee = xwrap(iteratee)
//   }
//   if (isPromise(acc)) {
//     return asyncReduceRight(iteratee, acc, list)
//   }
//   if (isGenerator(acc)) {
//     return generatorReduceRight(iteratee, acc, list)
//   }
//   if (isArrayLike(list)) {
//     return arrayReduce(iteratee, acc, list)
//   }
//   if (typeof list['fantasy-land/reduceRight'] === 'function') {
//     return _methodReduce(iteratee, acc, list, 'fantasy-land/reduceRight')
//   }
//   if (list[symIterator] != null) {
//     return _iterableReduce(iteratee, acc, list[symIterator]())
//   }
//   if (typeof list.next === 'function') {
//     return iterableReduceRight(iteratee, acc, list)
//   }
//   if (typeof list.reduceRight === 'function') {
//     return methodReduceRight(iteratee, acc, list, 'reduceRight')
//   }
//
//   throw new TypeError('reduce: list must be array or iterable')
// }
//
// export default reduceRight
