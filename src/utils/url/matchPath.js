import { pathToRegexp } from 'path-to-regexp'

const cache = {}
const cacheLimit = 10000
let cacheCount = 0

const compilePath = (path, options) => {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`
  const pathCache = cache[cacheKey] || (cache[cacheKey] = {})

  if (pathCache[path]) {
    return pathCache[path]
  }

  const keys = []
  const regexp = pathToRegexp(path, keys, options)
  const result = { keys, regexp }

  if (cacheCount < cacheLimit) {
    pathCache[path] = result
    cacheCount++
  }

  return result
}

/**
 * Public API for matching a URL pathname to a path.
 */
const matchPath = (pathname, options = {}) => {
  if (typeof options === 'string' || Array.isArray(options)) {
    options = { path: options }
  }

  const { exact = false, path, sensitive = false, strict = false } = options

  if (!path && path !== '') {
    return null
  }

  const { keys, regexp } = compilePath(path, {
    end: exact,
    sensitive,
    strict
  })
  const match = regexp.exec(pathname)

  if (!match) {
    return null
  }

  const [url, ...values] = match
  const isExact = pathname === url

  if (exact && !isExact) {
    return null
  }

  return {
    isExact,
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index]
      return memo
    }, {}),
    path,
    url: path === '/' && url === '' ? '/' : url
  }
}

export default matchPath
