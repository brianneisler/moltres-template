import { merge } from 'moltres-utils'
import createFactory from './createFactory'

const withDefaults = (defaultProps) => (factory) =>
  createFactory((props, ...rest) => factory(merge(defaultProps, props), ...rest))

export default withDefaults
