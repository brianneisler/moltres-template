import { equals, forEach, keys, isNil, prop } from 'moltres-utils'
import { lifecycle, setDisplayName, wrapDisplayName } from 'recompose'


const executePropTransitions = (propListenerMap, nextProps, oldProps = {}) =>
  forEach((propName) => {
    const getProp = prop(propName)
    const listeners = getProp(propListenerMap)
    const oldPropVal = getProp(oldProps)
    const nextPropVal = getProp(nextProps)
    if (listeners.onSet && isNil(oldPropVal) && !isNil(nextPropVal)) {
      listeners.onSet(nextPropVal)
    }
    if (listeners.onUnset && !isNil(oldPropVal) && isNil(nextPropVal)) {
      listeners.onUnset()
    }
    if (listeners.becomesTrue && !oldPropVal && nextPropVal) {
      listeners.becomesTrue()
    }
    if (listeners.becomesFalse && oldPropVal && !nextPropVal) {
      listeners.becomesFalse()
    }
    if (listeners.onIdChange && prop('id', oldPropVal) !== prop('id', nextPropVal)) {
      listeners.onIdChange(nextPropVal)
    }
    if (listeners.onChange && !equals(oldPropVal, nextPropVal)) {
      listeners.onChange(nextPropVal, nextProps)
    }
    if (listeners.falseToTrue && oldPropVal === false && nextPropVal === true) {
      listeners.falseToTrue()
    }
  }, keys(propListenerMap))


const withPropTransitions = (propListenerMap) => {
  const hoc = lifecycle({
    componentDidMount() {
      executePropTransitions(propListenerMap, this.props)
    },
    componentWillReceiveProps(nextProps) {
      executePropTransitions(propListenerMap, nextProps, this.props)
    }
  })
  if (process.env.NODE_ENV !== 'production') {
    return (BaseComponent) =>
      setDisplayName(wrapDisplayName(BaseComponent, 'withActions'))(
        hoc(BaseComponent)
      )
  }
  return hoc
}

export default withPropTransitions
