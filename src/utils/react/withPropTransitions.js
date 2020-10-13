import { lifecycle, setDisplayName, wrapDisplayName } from 'recompose'

import { equals, forEach, getProperty, isNil, keys } from '../lang'

const executePropTransitions = (
  propertyListenerMap,
  nextProps,
  oldProps = {}
) =>
  forEach((propertyName) => {
    const getPropertyName = getProperty(propertyName)
    const listeners = getPropertyName(propertyListenerMap)
    const oldPropertyValue = getPropertyName(oldProps)
    const nextPropertyValue = getPropertyName(nextProps)
    if (
      listeners.onSet &&
      isNil(oldPropertyValue) &&
      !isNil(nextPropertyValue)
    ) {
      listeners.onSet(nextPropertyValue)
    }
    if (
      listeners.onUnset &&
      !isNil(oldPropertyValue) &&
      isNil(nextPropertyValue)
    ) {
      listeners.onUnset()
    }
    if (listeners.becomesTrue && !oldPropertyValue && nextPropertyValue) {
      listeners.becomesTrue()
    }
    if (listeners.becomesFalse && oldPropertyValue && !nextPropertyValue) {
      listeners.becomesFalse()
    }
    if (
      listeners.onIdChange &&
      getProperty('id', oldPropertyValue) !==
        getProperty('id', nextPropertyValue)
    ) {
      listeners.onIdChange(nextPropertyValue)
    }
    if (listeners.onChange && !equals(oldPropertyValue, nextPropertyValue)) {
      listeners.onChange(nextPropertyValue, nextProps)
    }
    if (
      listeners.falseToTrue &&
      oldPropertyValue === false &&
      nextPropertyValue === true
    ) {
      listeners.falseToTrue()
    }
  }, keys(propertyListenerMap))

const withPropTransitions = (propertyListenerMap) => {
  const hoc = lifecycle({
    componentDidMount() {
      executePropTransitions(propertyListenerMap, this.props)
    },
    componentDidUpdate(prevProps) {
      executePropTransitions(propertyListenerMap, this.props, prevProps)
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
