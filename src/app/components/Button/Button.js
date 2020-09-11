import PropTypes from 'prop-types'
import React from 'react'

import { compose, getProp, hasProperty } from '../../../utils/lang'
import {
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape,
  withHandlers,
  withState
} from '../../../utils/react'
import { Colors, StyleSheet, StyleSheets, Styles } from '../../styles'
import Hoverable from '../Hoverable'
import Text from '../Text'
import TouchableOpacity from '../TouchableOpacity'

const TYPE_TO_BUTTON_TEXT_STYLES = StyleSheet.create({
  default: { color: Colors.grey8 },
  desctructive: { color: Colors.whitePrimary },
  positive: { color: Colors.whitePrimary }
})

const getButtonTextStyles = (type) => {
  if (hasProperty(type, TYPE_TO_BUTTON_TEXT_STYLES)) {
    return getProp(type, TYPE_TO_BUTTON_TEXT_STYLES)
  }
  return getProp('default', TYPE_TO_BUTTON_TEXT_STYLES)
}

const TYPE_TO_BUTTON_TEXT_HOVER_STYLES = StyleSheet.create({
  default: { color: Colors.blue6 },
  desctructive: { color: Colors.whitePrimary },
  positive: { color: Colors.whitePrimary }
})

const getButtonTextHoverStyles = (type) => {
  if (hasProperty(type, TYPE_TO_BUTTON_TEXT_HOVER_STYLES)) {
    return getProp(type, TYPE_TO_BUTTON_TEXT_HOVER_STYLES)
  }
  return getProp('default', TYPE_TO_BUTTON_TEXT_HOVER_STYLES)
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
    return getProp(type, TYPE_TO_BUTTON_STYLES)
  }
  return getProp('default', TYPE_TO_BUTTON_STYLES)
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
    return getProp(type, TYPE_TO_BUTTON_HOVER_STYLES)
  }
  return getProp('default', TYPE_TO_BUTTON_HOVER_STYLES)
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
    testID: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    type: PropTypes.string
  }),
  defaultProps({
    styles: {
      ...StyleSheets,
      ...StyleSheet.create({
        button: {
          borderRadius: 4,
          height: 24
        },
        buttonDefault: {
          backgroundColor: Colors.primaryWhite
        },
        buttonDestructive: {
          backgroundColor: Colors.warn
        },
        buttonDisabled: {
          backgroundColor: Colors.grey3,
          borderColor: Colors.grey5
        },
        buttonPositive: {
          backgroundColor: Colors.blue6
        },
        buttonText: {
          ...Styles.textMedium,
          color: Colors.whitePrimary,
          fontWeight: '600',
          padding: 8,
          textAlign: 'center'
        },
        buttonTextDisabled: {
          color: Colors.grey6
        }
      })
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
    styles,
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
          styles.button,
          getButtonStyles(type),
          style,
          hovered && getButtonHoverStyles(type),
          disabled && styles.buttonDisabled
        ]}
        testID={testID}
      >
        {React.isValidElement(text) ? (
          text
        ) : (
          <Text
            style={[
              styles.buttonText,
              getButtonTextStyles(type),
              hovered && getButtonTextHoverStyles(type),
              disabled && styles.buttonTextDisabled
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
