import { Component } from 'react'
import { isFunction, map } from '../lang'
import bindActionCreator from './bindActionCreator'
import createFactory from './createFactory'
import setDisplayName from './setDisplayName'
import withDispatch from './withDispatch'
import wrapDisplayName from './wrapDisplayName'

const withActions = (mapActionsToProps, wrapActionCreator = null) => (
  BaseComponent
) => {
  const factory = createFactory(BaseComponent)
  class WithActions extends Component {
    actions = map(
      (actionCreator) => {
        const boundActionCreator = bindActionCreator(
          actionCreator,
          this.props.dispatch
        )
        if (isFunction(wrapActionCreator)) {
          return wrapActionCreator(boundActionCreator)
        }
        return boundActionCreator
      },
      isFunction(mapActionsToProps)
        ? mapActionsToProps(this.props)
        : mapActionsToProps
    )

    render() {
      return factory({
        ...this.props,
        ...this.actions
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withActions'))(
      withDispatch()(WithActions)
    )
  }
  return withDispatch()(WithActions)
}

export default withActions
