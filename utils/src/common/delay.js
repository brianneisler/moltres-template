const delay = (func, wait, ...args) => {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  const timeoutId = setTimeout(func, +wait || 0, ...args)
  return () => clearTimeout(timeoutId)
}

export default delay
