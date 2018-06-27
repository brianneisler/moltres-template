import { curry, map } from 'ramda'

const mapAll = curry(async (fn, data) => Promise.all(map(fn, data)))

export default mapAll
