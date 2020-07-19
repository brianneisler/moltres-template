import { flatten } from 'ramda'

import booleanLiterals from './booleanLiterals'
import booleanObjects from './booleanObjects'

const booleans = () => flatten([booleanLiterals(), booleanObjects()])

export default booleans
