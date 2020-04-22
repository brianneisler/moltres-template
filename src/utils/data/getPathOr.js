import curry from './curry'
import defaultTo from './defaultTo'
import getPath from './getPath'

const getPathOr = curry((_default, path, value) => defaultTo(_default, getPath(path, value)))

export default getPathOr
