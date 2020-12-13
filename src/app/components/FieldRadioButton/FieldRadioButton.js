import { compose } from 'moltres/lang'
import { defaultProps, setDisplayName } from 'moltres/react'
import React from 'react'

import { Colors, StyleSheets } from '../../styles'
import Field from '../Field'
import RadioButton from '../RadioButton'
import Text from '../Text'
import View from '../View'

const enhance = compose(
  setDisplayName('FieldRadioButton'),
  defaultProps({
    styles: StyleSheets
  })
)

const renderRadioButton = ({
  disabled,
  fieldStyle,
  input,
  label,
  meta: { error, touched, warning },
  radioButtonStyle,
  required,
  styles
}) => {
  return (
    <View style={[styles.field, fieldStyle]}>
      <RadioButton
        disabled={disabled}
        onValueChange={input.onChange}
        style={[
          styles.radioButton,
          radioButtonStyle,
          disabled ? styles.disabled : styles.enabled
        ]}
        value={input.value}
      />
      {label ? (
        <Text style={styles.label}>
          {label}
          {required ? (
            <Text style={[styles.label, { color: Colors.redPrimary }]}>*</Text>
          ) : null}
        </Text>
      ) : null}
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

const FieldRadioButton = enhance(
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
        component={renderRadioButton}
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
        type="radio"
        validate={validate}
        // Overrides
        value={value}
        warn={warn}
      />
    )
  }
)

export default FieldRadioButton
