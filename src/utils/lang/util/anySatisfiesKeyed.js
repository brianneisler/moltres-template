import { isKeyed } from 'immutable'

import anyIsMap from './anyIsMap'

const anySatisfiesKeyed = (value) => isKeyed(value) || anyIsMap(value)

export default anySatisfiesKeyed
