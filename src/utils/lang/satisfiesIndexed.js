import { isIndexed } from 'immutable'

import isArray from './isArray'
import isString from './isString'

const satisfiesIndexed = (value) =>
  isIndexed(value) || isArray(value) || isString(value)

export default satisfiesIndexed
