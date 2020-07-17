import { resolve } from '../utils/lang'

const withResolve = (effect) => (...args) => resolve(effect(...args))

export default withResolve
