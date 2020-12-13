import { compose } from 'moltres/lang'
import {
  defaultProps,
  setDisplayName,
  useCallback,
  useEffect,
  useState,
  withProps
} from 'moltres/react'
import React from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { Colors, StyleSheet, StyleSheets } from '../../styles'

const enhance = compose(
  setDisplayName('TextInput'),
  defaultProps({
    editable: true,
    styles: StyleSheet.create({
      disabled: {
        backgroundColor: Colors.grey30,
        borderColor: Colors.grey50,
        color: Colors.grey60
      }
    })
  }),
  withProps((props) => {
    const [isFocused, setIsFocused] = useState(false)
    const [textInput, setTextInput] = useState()

    useEffect(() => {
      if (textInput && props.autoFocus) {
        setTimeout(() => {
          textInput.focus()
        }, 0)
      }
    }, [props.autoFocus, textInput])

    const onBlur = useCallback(() => {
      setIsFocused(false)
      if (props.onBlur) {
        props.onBlur()
      }
    }, [props.onBlur])

    const onFocus = useCallback(() => {
      setIsFocused(true)
      if (props.onFocus) {
        props.onFocus()
      }
    }, [props.onFocus])

    return {
      isFocused,
      onBlur,
      onFocus,
      setTextInput
    }
  })
)

const TextInput = enhance(
  ({ isFocused, setTextInput, style, styles, ...props }) => {
    return (
      <RNTextInput
        {...props}
        ref={setTextInput}
        style={[
          style,
          isFocused && StyleSheets.textInputFocus,
          !props.editable && styles.disabled
        ]}
      />
    )
  }
)

export default TextInput
