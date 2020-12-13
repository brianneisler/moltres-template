import { compose, noop } from 'moltres/lang'
import {
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape
} from 'moltres/react'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'

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
