import { Colors, StyleSheet, StyleSheets, Styles } from '../../styles'
import { compose, getProp, hasProp } from '../../../utils/lang'
import {
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape
} from '../../../utils/react'
import PropTypes from 'prop-types'
import React from 'react'
import Text from '../Text'
import TouchableOpacity from '../TouchableOpacity'

const TYPE_TO_BUTTON_TEXT_STYLES = StyleSheet.create({
  default: { color: Colors.grey8 },
  desctructive: { color: Colors.whitePrimary },
  positive: { color: Colors.whitePrimary }
})

const getButtonTextStyles = (type) => {
  if (hasProp(type, TYPE_TO_BUTTON_TEXT_STYLES)) {
    return getProp(type, TYPE_TO_BUTTON_TEXT_STYLES)
  }
  return getProp('default', TYPE_TO_BUTTON_TEXT_STYLES)
}

const TYPE_TO_BUTTON_STYLES = StyleSheet.create({
  default: {
    backgroundColor: Colors.whitePrimary,
    borderColor: Colors.grey5,
    borderStyle: 'solid',
    borderWidth: 1
  },
  desctructive: { color: Colors.whitePrimary },
  positive: { backgroundColor: Colors.blue6 }
})
const getButtonStyles = (type) => {
  if (hasProp(type, TYPE_TO_BUTTON_STYLES)) {
    return getProp(type, TYPE_TO_BUTTON_STYLES)
  }
  return getProp('default', TYPE_TO_BUTTON_STYLES)
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
  })
)

const Button = enhance(
  ({
    accessibilityLabel,
    disabled,
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
            disabled && styles.buttonTextDisabled
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  )
)

export default Button
