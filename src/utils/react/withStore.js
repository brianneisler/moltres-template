import createFactory from './createFactory'
import setDisplayName from './setDisplayName'
import useStore from './useStore'
import wrapDisplayName from './wrapDisplayName'

const withStore = () => (BaseComponent) => {
  const factory = createFactory(BaseComponent)

  const StoreComponent = (props) =>
    factory({
      ...props,
      store: useStore()
    })

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withStore'))(
      StoreComponent
    )
  }
  return StoreComponent
}

export default withStore
