import { SYMBOL_ITERATOR } from '../constants'

const isIterable = (value) => value != null && value[SYMBOL_ITERATOR] != null

export default isIterable
