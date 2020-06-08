import { ITERATOR } from './constants/Symbol'

const iterator = (value) => value[ITERATOR]()

export default iterator
