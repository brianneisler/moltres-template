import { bool, element, func, oneOfType } from 'prop-types'
import React from 'react'

import { compose, noop } from '../../../utils/lang'
import {
  defaultProps,
  memo,
  setDisplayName,
  setPropTypes,
  useCallback,
  useSelector,
  useState,
  withProps
} from '../../../utils/react'
import { selectHoverIsEnabled } from '../../modules/hover'

const enhance = compose(
  setDisplayName('Hoverable'),
  setPropTypes({
    children: oneOfType([func, element]),
    disabled: bool,
    onHoverIn: func,
    onHoverOut: func
  }),
  defaultProps({
    disabled: false,
    onHoverIn: noop,
    onHoverOut: noop
  }),
  withProps(({ disabled, onHoverIn, onHoverOut }) => {
    const [isHovered, setHovered] = useState(false)
    const [showHover, setShowHover] = useState(true)
    const isHoverEnabled = useSelector(selectHoverIsEnabled)

    const onMouseEnter = useCallback(() => {
      if (isHoverEnabled && !isHovered && !disabled) {
        onHoverIn()
        setHovered(true)
      }
    }, [disabled, isHoverEnabled, isHovered, onHoverIn])

    const onMouseLeave = useCallback(() => {
      if (isHovered) {
        onHoverOut()
        setHovered(false)
      }
    }, [isHovered, onHoverOut])

    const onPressIn = useCallback(() => {
      setShowHover(false)
    })

    const onResponderGrant = useCallback(() => setShowHover(false))
    const onResponderRelease = useCallback(() => setShowHover(true))

    return {
      isHovered,
      onMouseEnter,
      onMouseLeave,
      // if child is Touchable
      onPressIn,
      onPressOut: noop,
      // prevent hover showing while responder
      onResponderGrant,
      onResponderRelease,
      showHover
    }
  }),
  memo
)

const Hoverable = enhance(
  ({
    children,
    isHovered,
    onMouseEnter,
    onMouseLeave,
    onPressIn,
    onPressOut,
    onResponderGrant,
    onResponderRelease,
    showHover
  }) => {
    const child =
      typeof children === 'function'
        ? children(showHover && isHovered)
        : children

    return React.cloneElement(React.Children.only(child), {
      onMouseEnter,
      onMouseLeave,
      onPressIn,
      onPressOut,
      onResponderGrant,
      onResponderRelease
    })
  }
)

export default Hoverable
