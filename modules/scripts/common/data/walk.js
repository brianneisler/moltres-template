const { curryN } = require('ramda')

const baseWalk = (walkee, iteratee, ...args) => {
  const walker = (...pass) => walkee(...pass, walker)
  return walkee(...args, iteratee, walker)
}

const walk = curryN(3, (walkee, iteratee, ...args) =>
  baseWalk(walkee, iteratee, ...args))

module.exports = walk
