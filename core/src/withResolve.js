import resolve from './resolve'

const withResolve = (effect) => (...args) => resolve(effect(...args))

export default withResolve
