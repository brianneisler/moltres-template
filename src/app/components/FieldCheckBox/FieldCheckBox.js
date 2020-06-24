import { Colors, Styles } from '../../styles'
import { compose } from '../../../utils/lang'
import { defaultProps, setDisplayName } from '../../../utils/react'
import CheckBox from '../CheckBox'
import Field from '../Field'
import React from 'react'
import Text from '../Text'
import View from '../View'

const enhance = compose(
  setDisplayName('FieldCheckBox'),
  defaultProps({
    styles: Styles
  })
)

const renderCheckBox = ({
  checkBoxStyle,
  disabled,
  fieldStyle,
  input,
  label,
  meta: { error, touched, warning },
  required,
  styles
}) => {
  return (
    <View style={[styles.field, fieldStyle]}>
      <CheckBox
        disabled={disabled}
        onValueChange={input.onChange}
        style={[
          styles.checkBox,
          checkBoxStyle,
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

const FieldCheckBox = enhance(
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
        component={renderCheckBox}
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
        type="checkbox"
        validate={validate}
        // Overrides
        value={value}
        warn={warn}
      />
    )
  }
)

export default FieldCheckBox
