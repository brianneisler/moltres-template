import assoc from './assoc'
import defn from './defn'

const set = defn('set', (...args) => assoc(...args))

export default set
