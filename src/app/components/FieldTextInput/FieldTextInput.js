import React from 'react'

import { compose } from '../../../utils/lang'
import { defaultProps, setDisplayName } from '../../../utils/react'
import { Colors, Styles } from '../../styles'
import Field from '../Field'
import Text from '../Text'
import TextInput from '../TextInput'
import View from '../View'

const enhance = compose(
  setDisplayName('FieldTextInput'),
  defaultProps({
    styles: Styles
  })
)

const renderTextInput = ({
  // NOTE BRN: The commented out ones are not supported on web
  allowFontScaling,
  autoCapitalize,
  // autoCompleteType,
  autoCorrect,
  autoFocus,
  blurOnSubmit,
  caretHidden,
  clearButtonMode,
  clearTextOnFocus,
  // contextMenuHidden,
  dataDetectorTypes,
  defaultValue,
  disableFullscreenUI,
  disabled,
  enablesReturnKeyAutomatically,
  fieldStyle,
  // importantForAutofill,
  inlineImageLeft,
  input,
  keyboardType,
  label,
  maxLength,
  meta: { error, touched, warning },
  // onContextSizeChange,
  onSubmitEditing,
  placeholder,
  required,
  returnKeyLabel,
  returnKeyType,
  styles,
  textContentType,
  textInputStyle
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
      <TextInput
        allowFontScaling={allowFontScaling}
        autoCapitalize={autoCapitalize}
        // autoCompleteType={autoCompleteType}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        blurOnSubmit={blurOnSubmit}
        caretHidden={caretHidden}
        clearButtonMode={clearButtonMode}
        clearTextOnFocus={clearTextOnFocus}
        // contextMenuHidden={contextMenuHidden}
        dataDetectorTypes={dataDetectorTypes}
        defaultValue={defaultValue}
        disableFullscreenUI={disableFullscreenUI}
        editable={!disabled}
        enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
        // importantForAutofill={importantForAutofill}
        inlineImageLeft={inlineImageLeft}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onBlur={input.onBlur}
        onChangeText={input.onChange}
        // onContextSizeChange={onContextSizeChange}
        onFocus={input.onFocus}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        returnKeyLabel={returnKeyLabel}
        returnKeyType={returnKeyType}
        style={[
          styles.textInput,
          textInputStyle,
          disabled ? styles.disabled : styles.enabled
        ]}
        textContentType={textContentType}
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

const FieldTextInput = enhance(
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
        component={renderTextInput}
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
        type="text"
        validate={validate}
        // Overrides
        value={value}
        warn={warn}
      />
    )
  }
)

export default FieldTextInput
