import React from 'react'
import { StyleSheet } from 'react-native'

import { compose, getProperty } from '../../../utils/lang'
import {
  defaultProps,
  setDisplayName,
  withPropsOnChange,
  withState
} from '../../../utils/react'
import { Colors, Styles } from '../../styles'
import Field from '../Field'
import FileInput from '../FileInput'
import Fragment from '../Fragment'
import Icon from '../Icon'
import ImageView from '../ImageView'
import Text from '../Text'
import TouchableOpacity from '../TouchableOpacity'
import View from '../View'

const readFileAsDataURL = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (event) => resolve(event.target.result)
    reader.readAsDataURL(file)
  })
}

const enhance = compose(
  setDisplayName('FieldFileInput'),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        imageUploadContainer: {
          borderRadius: 5,
          shadowColor: '#000',
          shadowOffset: { height: -1, width: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 1,
          width: '100%'
        },
        imageUploadIcon: {
          color: 'rgba(0, 0, 0, 0.50)',
          fontSize: 120,
          textAlign: 'center'
        },
        imageUploadInput: {
          cursor: 'pointer',
          height: '100%',
          opacity: 0,
          position: 'absolute',
          top: 0,
          width: '100%'
        },
        imageUploadText: {
          textAlign: 'center'
        }
      })
    }
  }),
  withState('source', 'setSource'),
  withPropsOnChange(['input'], ({ input, setSource }) => {
    if (input.value) {
      readFileAsDataURL(input.value).then((dataURL) => {
        setSource({ uri: dataURL })
      })
    }
  })
)

const renderFileInput = enhance(
  ({
    accept,
    fieldStyle,
    fileInputStyle,
    input,
    label,
    meta: { error, touched, warning },
    required,
    source,
    styles,
    submitting
  }) => {
    const disabled = submitting
    // TODO BRN: Figure out how to get the height of the imageFile
    return (
      <View style={[styles.field, fieldStyle]}>
        {label ? (
          <Text style={styles.label}>
            {label}
            {required ? (
              <Text style={[styles.label, { color: Colors.redPrimary }]}>
                *
              </Text>
            ) : null}
          </Text>
        ) : null}
        <TouchableOpacity
          disabled={disabled}
          style={[styles.container, styles.imageUploadContainer]}
        >
          <FileInput
            accept={accept}
            disabled={disabled}
            inputStyle={[styles.imageUploadInput]}
            onChange={input.onChange}
            style={[styles.block, fileInputStyle]}
          >
            {source ? (
              <ImageView
                imageHeight={getProperty('height', input.value)}
                imageWidth={getProperty('width', input.value)}
                source={source}
              />
            ) : (
              <Fragment>
                <Text style={[styles.imageUploadIcon]}>
                  <Icon icon="image" />
                </Text>
                <Text style={[styles.mediumText, styles.imageUploadText]}>
                  Click to upload
                </Text>
              </Fragment>
            )}
          </FileInput>
        </TouchableOpacity>
        {touched &&
          ((error && (
            <Text style={[styles.errorText, styles.alignSelfStart]}>
              {error}
            </Text>
          )) ||
            (warning && (
              <Text style={[styles.warningText, styles.alignSelfStart]}>
                {warning}
              </Text>
            )))}
      </View>
    )
  }
)

const FieldFileInput = ({
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
      component={renderFileInput}
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
      type="file"
      validate={validate}
      // Overrides
      value={value}
      warn={warn}
    />
  )
}

export default FieldFileInput
