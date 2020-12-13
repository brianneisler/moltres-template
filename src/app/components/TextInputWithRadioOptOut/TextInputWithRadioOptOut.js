import { compose, isNil, noop } from 'moltres/lang'
import PropTypes from 'prop-types'
import React from 'react'

import {
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape,
  withHandlers
} from 'moltres/react'
import { Colors, StyleSheet, StyleSheets, Styles } from '../../styles'
import RadioButton from '../RadioButton'
import Text from '../Text'
import TextInput from '../TextInput'
import View from '../View'

const enhance = compose(
  setDisplayName('TextInputWithRadioOptOut'),
  setPropTypes({
    allowFontScaling: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    autoCorrect: PropTypes.bool,
    autoFocus: PropTypes.bool,
    blurOnSubmit: PropTypes.bool,
    caretHidden: PropTypes.bool,
    clearButtonMode: PropTypes.string,
    clearTextOnFocus: PropTypes.bool,
    dataDetectorTypes: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    disableFullscreenUI: PropTypes.bool,
    editable: PropTypes.bool,
    enablesReturnKeyAutomatically: PropTypes.bool,
    inlineImageLeft: PropTypes.string,
    inlineImagePadding: PropTypes.number,
    keyboardAppearance: PropTypes.string,
    keyboardType: PropTypes.string,
    maxFontSizeMultiplier: PropTypes.number,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func,
    onContentSizeChange: PropTypes.func,
    onEndEditing: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func,
    onLayout: PropTypes.func,
    onScroll: PropTypes.func,
    onSelectionChange: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onTextInput: PropTypes.func,
    onValueChange: PropTypes.func,
    optOutText: PropTypes.string,
    passwordRules: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    rejectResponderTermination: PropTypes.bool,
    returnKeyLabel: PropTypes.string,
    returnKeyType: PropTypes.string,
    scrollEnabled: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    selectTextOnFocus: PropTypes.bool,
    selection: PropTypes.object,
    selectionColor: PropTypes.string,
    showSoftInputOnFocus: PropTypes.bool,
    spellCheck: PropTypes.bool,
    style: styleShape,
    textAlign: PropTypes.string,
    textBreakStrategy: PropTypes.string,
    textContentType: PropTypes.string,
    underlineColorAndroid: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  }),
  defaultProps({
    editable: true,
    onValueChange: noop,
    styles: {
      ...StyleSheets,
      ...StyleSheet.create({
        textInputDiscarded: {
          backgroundColor: Colors.grey3,
          borderColor: Colors.grey5,
          color: Colors.grey6
        },
        textOptOut: {
          ...Styles.textSmall,
          alignItems: 'center',
          marginLeft: 8
        },
        textOptOutDisabled: {
          color: Colors.grey6
        },
        wrapper: {
          alignItems: 'flex-start'
        }
      })
    },
    value: null
  }),
  withHandlers({
    handleRadioValueChange: ({ onValueChange }) => (event) => {
      if (event) {
        onValueChange(false)
      }
    },
    handleTextInputChange: ({ onValueChange }) => (event) => {
      onValueChange(event)
    },
    handleTextInputFocus: ({ onValueChange, value }) => () => {
      if (value === false) {
        onValueChange(null)
      }
    }
  })
)

const getTextValue = (value) => {
  if (isNil(value) || value === false) {
    return ''
  }
  return value
}

const getRadioValue = (value) => value === false

const TextInputWithRadioOptOut = enhance(
  ({
    editable,
    handleRadioValueChange,
    handleTextInputChange,
    handleTextInputFocus,
    optOutText,
    style,
    styles,
    value,
    ...rest
  }) => {
    const radioValue = getRadioValue(value)
    return (
      <View style={styles.wrapper}>
        <TextInput
          {...rest}
          editable={editable}
          onChangeText={handleTextInputChange}
          onFocus={handleTextInputFocus}
          style={[style, radioValue ? styles.textInputDiscarded : null]}
          value={getTextValue(value)}
        />
        <View style={styles.inline}>
          <RadioButton
            editable={editable}
            onValueChange={handleRadioValueChange}
            value={radioValue}
          />
          <Text
            style={[styles.textOptOut, !editable && styles.textOptOutDisabled]}
          >
            {optOutText}
          </Text>
        </View>
      </View>
    )
  }
)

export default TextInputWithRadioOptOut
