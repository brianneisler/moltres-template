import exif from 'exif-js'
import { compose, noop } from 'moltres/lang'
import {
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape,
  withHandlers,
  withState
} from 'moltres/react'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'

import { Styles } from '../../styles'
import View from '../View'

const readFileAsDataURL = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (event) => resolve(event.target.result)
    reader.readAsDataURL(file)
  })
}

const createImage = async (data) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = data
  })
}

const rotate = async (type, img) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')

    exif.getData(img, function () {
      const orientation = exif.getAllTags(this).Orientation

      if ([5, 6, 7, 8].indexOf(orientation) > -1) {
        canvas.width = img.height
        canvas.height = img.width
      } else {
        canvas.width = img.width
        canvas.height = img.height
      }

      const ctx = canvas.getContext('2d')

      switch (orientation) {
        case 2:
          ctx.transform(-1, 0, 0, 1, img.width, 0)
          break
        case 3:
          ctx.transform(-1, 0, 0, -1, img.width, img.height)
          break
        case 4:
          ctx.transform(1, 0, 0, -1, 0, img.height)
          break
        case 5:
          ctx.transform(0, 1, 1, 0, 0, 0)
          break
        case 6:
          ctx.transform(0, 1, -1, 0, img.height, 0)
          break
        case 7:
          ctx.transform(0, -1, -1, 0, img.height, img.width)
          break
        case 8:
          ctx.transform(0, -1, 1, 0, 0, img.width)
          break
        default:
          ctx.transform(1, 0, 0, 1, 0, 0)
      }

      ctx.drawImage(img, 0, 0, img.width, img.height)
      canvas.toBlob(resolve, type)
    })
  })
}

const readAndCorrect = async (file) => {
  // TODO BRN: Check for image type
  const dataURL = await readFileAsDataURL(file)
  const image = await createImage(dataURL)
  const corrected = await rotate(file.type, image)
  corrected.name = file.name
  corrected.width = image.width
  corrected.height = image.height
  return corrected
}

const enhance = compose(
  setDisplayName('FileInput'),
  setPropTypes({
    accept: PropTypes.string,
    inputStyle: styleShape,
    onChange: PropTypes.func,
    style: styleShape
  }),
  defaultProps({
    onChange: noop,
    styles: Styles
  }),
  withState('value', 'setValue', ''),
  withHandlers({
    handleChange: ({ onChange, setValue }) => (event) => {
      readAndCorrect(event.target.files[0]).then(async (file) => {
        const corrected = await readAndCorrect(file)
        onChange(corrected)
        // NOTE BRN: We reset the value to empty here so that if the user
        // selects the same image again, we'll get another change event.
        setValue('')
      })
    }
  })
)
// TODO BRN: Figure out how to pass a default into a file input
const FileInput = enhance(
  ({ accept, children, handleChange, inputStyle, style, value }) => (
    <View style={style}>
      {children}
      <input
        accept={accept}
        onChange={handleChange}
        style={StyleSheet.flatten([inputStyle])}
        type="file"
        value={value}
      />
    </View>
  )
)

export default FileInput
