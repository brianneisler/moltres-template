import createFactory from './createFactory'
import forwardRef from './forwardRef'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'

const withForwardRef = () => (BaseComponent) => {
  const factory = createFactory(BaseComponent)
  const ForwardRef = forwardRef((props, ref) =>
    factory({
      ...props,
      forwardRef: ref
    })
  )

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withForwardRef'))(
      ForwardRef
    )
  }
  return ForwardRef
}

export default withForwardRef
