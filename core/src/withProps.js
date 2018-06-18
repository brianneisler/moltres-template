import { is, merge } from 'moltres-utils'
import mapProps from './mapProps'

const withProps = (input) =>
  mapProps((props, ...rest) => merge(
    props,
    (
      is(Function, input)
        ? input(props, ...rest)
        : input
    )
  ))

export default withProps
