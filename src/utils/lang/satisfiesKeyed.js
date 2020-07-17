import { isKeyed } from 'immutable'

import isMap from './isMap'

const satisfiesKeyed = (value) => isKeyed(value) || isMap(value)

export default satisfiesKeyed
