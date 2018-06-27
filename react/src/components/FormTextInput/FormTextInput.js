import React from 'react'
import { TextInput, View } from 'react-native'

const FormTextInput = ({ input, ...inputProps }) => (
  <View>
    <TextInput
      {...inputProps}
      onChangeText={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      value={input.value}
    />
  </View>
)

export default FormTextInput
