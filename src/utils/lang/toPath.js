import { ImmutableList } from './classes'
import _toPath from 'lodash/toPath'

const toPath = (value) => ImmutableList(_toPath(value))

export default toPath