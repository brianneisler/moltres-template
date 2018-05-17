import { find, is } from 'ramda'

const findPath = (...values) => find(is(String))(values)

export default findPath
