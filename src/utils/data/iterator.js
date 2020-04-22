import { SYMBOL_ITERATOR } from './constants'

const iterator = (value) => value[SYMBOL_ITERATOR]()

export default iterator
