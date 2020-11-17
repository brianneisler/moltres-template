import { compose } from 'moltres/lang'
import { defaultProps, setDisplayName } from 'moltres/react'
import React from 'react'

import { Colors, StyleSheets } from '../../styles'
import Field from '../Field'
import Text from '../Text'
import TextInputWithRadioOptOut from '../TextInputWithRadioOptOut'
import View from '../View'

const enhance = compose(
  setDisplayName('FieldTextInputWithRadioOptOut '),
  defaultProps({
    styles: StyleSheets
  })
)

const renderTextInputWithRadioOptOut = ({
  editable,
  fieldStyle,
  input,
  label,
  meta: { error, touched, warning },
  required,
  styles,
  textInputStyle,
  ...rest
}) => {
  return (
    <View style={[styles.field, fieldStyle]}>
      {label ? (
        <Text style={styles.label}>
          {label}
          {required ? (
            <Text style={[styles.label, { color: Colors.redPrimary }]}>*</Text>
          ) : null}
        </Text>
      ) : null}
      <TextInputWithRadioOptOut
        {...rest}
        editable={editable}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        onValueChange={input.onChange}
        style={[styles.textInput, textInputStyle]}
        value={input.value}
      />
      {touched &&
        ((error && (
          <Text style={[styles.errorText, styles.alignSelfStart]}>{error}</Text>
        )) ||
          (warning && (
            <Text style={[styles.warningText, styles.alignSelfStart]}>
              {warning}
            </Text>
          )))}
    </View>
  )
}

const FieldTextInputWithRadioOptOut = enhance(
  ({
    format,
    forwardRef,
    immutableProps,
    name,
    normalize,
    onBlur,
    onChange,
    onDragStart,
    onDrop,
    onFocus,
    parse,
    validate,
    value,
    warn,
    ...props
  }) => {
    return (
      <Field
        component={renderTextInputWithRadioOptOut}
        format={format}
        forwardRef={forwardRef}
        immutableProps={immutableProps}
        name={name}
        normalize={normalize}
        onBlur={onBlur}
        onChange={onChange}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onFocus={onFocus}
        parse={parse}
        props={props}
        validate={validate}
        // Overrides
        value={value}
        warn={warn}
      />
    )
  }
)

export default FieldTextInputWithRadioOptOut
