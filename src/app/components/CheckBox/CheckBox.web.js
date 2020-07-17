import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'

import { compose, noop } from '../../../utils/lang'
import {
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape
} from '../../../utils/react'

const enhance = compose(
  setDisplayName('CheckBox'),
  setPropTypes({
    disabled: PropTypes.string,
    onValueChange: PropTypes.func,
    style: styleShape,
    value: PropTypes.bool
  }),
  defaultProps({
    onValueChange: noop,
    styles: StyleSheet.create({})
  })
)

const CheckBox = enhance(({ disabled, name, onValueChange, style, value }) => (
  <input
    checked={value}
    disabled={disabled}
    name={name}
    onChange={onValueChange}
    style={style}
    type="checkbox"
  />
))

export default CheckBox
