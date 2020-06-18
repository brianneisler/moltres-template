import curry from './curry'
import getProp from './getProp'

const propOf = curry((value, name) => getProp(name, value))

export default propOf
