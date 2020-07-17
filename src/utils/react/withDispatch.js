import createFactory from './createFactory'
import setDisplayName from './setDisplayName'
import useDispatch from './useDispatch'
import wrapDisplayName from './wrapDisplayName'

const withDispatch = () => (BaseComponent) => {
  const factory = createFactory(BaseComponent)

  const DispatchComponent = (props) =>
    factory({
      ...props,
      dispatch: useDispatch()
    })

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withDispatch'))(
      DispatchComponent
    )
  }
  return DispatchComponent
}

export default withDispatch
