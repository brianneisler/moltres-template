import { forEach, is } from 'ramda'


const makeCacheChain = () => ({
  strongMap: new Map(),
  weakMap: new WeakMap()
})

const makeCacheLink = () => ({
  ref: {},
  cacheChain: makeCacheChain()
})

const isWeakKey = is(Object)

const deleteCacheKey = (cacheChain, key) => {
  if (isWeakKey(key)) {
    return cacheChain.weakMap.delete(key)
  }
  return cacheChain.strongMap.delete(key)
}

const hasCacheKey = (cacheChain, key) => {
  if (isWeakKey(key)) {
    return cacheChain.weakMap.has(key)
  }
  return cacheChain.strongMap.has(key)
}

const setCacheKey = (cacheChain, key, value) => {
  if (isWeakKey(key)) {
    return cacheChain.weakMap.set(key, value)
  }
  return cacheChain.strongMap.set(key, value)
}

const getCacheKey = (cacheChain, key) => {
  if (isWeakKey(key)) {
    return cacheChain.weakMap.get(key)
  }
  return cacheChain.strongMap.get(key)
}

const linkCacheKey = (cacheChain, key) => {
  let link = getCacheKey(cacheChain, key)
  if (!link) {
    link = makeCacheLink()
    setCacheKey(cacheChain, key, link)
  }
  return link
}


const cache = makeCacheChain()
const cacheChain = (...args) => {
  let chain = cache
  let link = linkCacheKey(chain)
  forEach((arg) => {
    link = linkCacheKey(chain, arg)
    chain = link.cacheChain
  }, args)
  return link.ref
}

export default cacheChain
