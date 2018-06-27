import { wrapActionCreators } from 'moltres'
import { is } from 'moltres-utils'
import { compose, getContext, setDisplayName, withProps, wrapDisplayName } from 'recompose'
import storeShape from './storeShape'

const defaultMapActionsToProps = (dispatch) => ({ dispatch })

const withActions = (mapActionsToProps) => {
  let mapActions = mapActionsToProps || defaultMapActionsToProps
  if (is(Function, mapActionsToProps)) {
    mapActions = mapActionsToProps
  } else {
    mapActions = wrapActionCreators(mapActionsToProps)
  }

  const hoc = compose(
    getContext({
      store: storeShape
    }),
    withProps((props) => {
      const { store } = props
      return {
        ...props,
        ...(is(Function, mapActions) ? mapActions(store.dispatch, props) : mapActions)
      }
    })
  )
  if (process.env.NODE_ENV !== 'production') {
    return (BaseComponent) =>
      setDisplayName(wrapDisplayName(BaseComponent, 'withActions'))(hoc(BaseComponent))
  }
  return hoc
}

export default withActions
