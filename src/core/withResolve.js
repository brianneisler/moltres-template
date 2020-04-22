import { resolve } from '../utils/data'

const withResolve = (effect) => (...args) => resolve(effect(...args))

export default withResolve
