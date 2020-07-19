import _toPath from 'lodash/toPath'

import { ImmutableList } from './classes'

const toPath = (value) => ImmutableList(_toPath(value))

export default toPath
