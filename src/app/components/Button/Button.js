import { Colors, Fonts, Styles } from '../../styles'
import { StyleSheet } from 'react-native'
import { compose } from '../../../utils/data'
import { defaultProps, setDisplayName, setPropTypes } from '../../../utils/react'
import PropTypes from 'prop-types'
import React from 'react'
import Text from '../Text'
import TouchableOpacity from '../TouchableOpacity'
import View from '../View'

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
    style: View.propTypes.style,
    testID: PropTypes.string,
    title: PropTypes.string.isRequired
  }),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        button: {
          backgroundColor: Colors.bluePrimary,
          borderRadius: 2
        },
        text: {
          color: Colors.whitePrimary,
          fontFamily: Fonts.primaryFontFamily,
          fontWeight: '500',
          padding: 8,
          textAlign: 'center',
          textTransform: 'uppercase'
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
    title
  }) => {
    return (
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
        style={[styles.button, style, disabled && styles.disabled]}
        testID={testID}
      >
        <Text style={[styles.text, disabled && styles.disabled]}>{title}</Text>
      </TouchableOpacity>
    )
  }
)

export default Button
