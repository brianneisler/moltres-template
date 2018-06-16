import { is } from 'ramda'
import compose from './compose'

const createFactory = (func) => (props, ...rest) => {
  if (is(Function, props)) {
    return createFactory(compose(func, props))
  }
  return func(props, ...rest)
}


export default createFactory
