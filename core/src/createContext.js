import { __, get, has, merge, set } from 'moltres-utils'

const createContext = (data = {}) => ({
  get: get(__, data),
  has: has(__, data),
  merge: (updates) => createContext(merge(data, updates)),
  set: (selector, value) => createContext(set(selector, value, data)),
  toJSON: () => JSON.stringify(data),
  toObject: () => data
})

export default createContext
