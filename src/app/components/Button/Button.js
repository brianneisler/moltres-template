import PropTypes from 'prop-types'
import React from 'react'

import { compose, getProperty, hasProperty, noop } from '../../../utils/lang'
import {
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape,
  withHandlers,
  withState
} from '../../../utils/react'
import { Colors, StyleSheet, StyleSheets } from '../../styles'
import ActivityIndicator from '../ActivityIndicator'
import Hoverable from '../Hoverable'
import Text from '../Text'
import TouchableOpacity from '../TouchableOpacity'
import View from '../View'

import _styleSheet from './styleSheet'

const TYPE_TO_BUTTON_TEXT_STYLES = StyleSheet.create({
  default: { color: Colors.grey8 },
  desctructive: { color: Colors.whitePrimary },
  positive: { color: Colors.whitePrimary }
})

const getButtonTextStyles = (type) => {
  if (hasProperty(type, TYPE_TO_BUTTON_TEXT_STYLES)) {
    return getProperty(type, TYPE_TO_BUTTON_TEXT_STYLES)
  }
  return getProperty('default', TYPE_TO_BUTTON_TEXT_STYLES)
}

const TYPE_TO_BUTTON_TEXT_HOVER_STYLES = StyleSheet.create({
  default: { color: Colors.blue6 },
  desctructive: { color: Colors.whitePrimary },
  positive: { color: Colors.whitePrimary }
})

const getButtonTextHoverStyles = (type) => {
  if (hasProperty(type, TYPE_TO_BUTTON_TEXT_HOVER_STYLES)) {
    return getProperty(type, TYPE_TO_BUTTON_TEXT_HOVER_STYLES)
  }
  return getProperty('default', TYPE_TO_BUTTON_TEXT_HOVER_STYLES)
}

const TYPE_TO_BUTTON_STYLES = StyleSheet.create({
  default: {
    backgroundColor: Colors.whitePrimary,
    borderColor: Colors.grey5,
    borderStyle: 'solid',
    borderWidth: 1
  },
  desctructive: { color: Colors.whitePrimary },
  positive: {
    backgroundColor: Colors.blue6
  }
})
const getButtonStyles = (type) => {
  if (hasProperty(type, TYPE_TO_BUTTON_STYLES)) {
    return getProperty(type, TYPE_TO_BUTTON_STYLES)
  }
  return getProperty('default', TYPE_TO_BUTTON_STYLES)
}

const TYPE_TO_BUTTON_HOVER_STYLES = StyleSheet.create({
  default: {
    backgroundColor: Colors.whitePrimary,
    borderColor: Colors.grey5,
    borderStyle: 'solid',
    borderWidth: 1
  },
  desctructive: { color: Colors.whitePrimary },
  positive: {
    backgroundColor: Colors.blue3
  }
})

const getButtonHoverStyles = (type) => {
  if (hasProperty(type, TYPE_TO_BUTTON_HOVER_STYLES)) {
    return getProperty(type, TYPE_TO_BUTTON_HOVER_STYLES)
  }
  return getProperty('default', TYPE_TO_BUTTON_HOVER_STYLES)
}

const enhance = compose(
  setDisplayName('Button'),
  setPropTypes({
    accessibilityLabel: PropTypes.string,
    disabled: PropTypes.bool,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseUp: PropTypes.func,
    onPress: PropTypes.func.isRequired,
    style: styleShape,
    submitting: PropTypes.bool,
    testID: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    type: PropTypes.string
  }),
  defaultProps({
    onPress: noop,
    styleSheet: {
      ...StyleSheets,
      ..._styleSheet
    }
  }),
  withState('hovered', 'setHovered', false),
  withHandlers({
    onHoverIn: ({ setHovered }) => () => setHovered(true),
    onHoverOut: ({ setHovered }) => () => setHovered(false)
  })
)

const Button = enhance(
  ({
    accessibilityLabel,
    disabled,
    hovered,
    onHoverIn,
    onHoverOut,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onPress,
    style,
    styleSheet,
    submitting,
    testID,
    text,
    type
  }) => (
    <Hoverable
      disabled={disabled}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
    >
      <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        disabled={disabled}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
        onMouseUp={onMouseUp}
        onPress={onPress}
        style={[
          styleSheet.button,
          getButtonStyles(type),
          style,
          hovered && getButtonHoverStyles(type),
          (disabled || submitting) && styleSheet.buttonDisabled
        ]}
        testID={testID}
      >
        {submitting ? (
          <View style={styleSheet.activityIndicatorOverlay}>
            <ActivityIndicator />
          </View>
        ) : React.isValidElement(text) ? (
          text
        ) : (
          <Text
            style={[
              styleSheet.buttonText,
              getButtonTextStyles(type),
              hovered && getButtonTextHoverStyles(type),
              (disabled || submitting) && styleSheet.buttonTextDisabled
            ]}
          >
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </Hoverable>
  )
)

export default Button
