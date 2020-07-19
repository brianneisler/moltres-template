import { lifecycle, setDisplayName, wrapDisplayName } from 'recompose'

import { equals, forEach, getProp, isNil, keys } from '../lang'

const executePropTransitions = (propListenerMap, nextProps, oldProps = {}) =>
  forEach((propName) => {
    const getPropName = getProp(propName)
    const listeners = getPropName(propListenerMap)
    const oldPropVal = getPropName(oldProps)
    const nextPropVal = getPropName(nextProps)
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
    if (
      listeners.onIdChange &&
      getProp('id', oldPropVal) !== getProp('id', nextPropVal)
    ) {
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
    componentDidUpdate(prevProps) {
      executePropTransitions(propListenerMap, this.props, prevProps)
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
