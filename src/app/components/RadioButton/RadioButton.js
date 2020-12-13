import { compose, noop, weakMemoize } from 'moltres/lang'
import {
  defaultProps,
  memo,
  setDisplayName,
  setPropTypes,
  styleShape,
  withHandlers,
  withPropsOnChange,
  withState
} from 'moltres/react'
import PropTypes from 'prop-types'
import React from 'react'

import Hoverable from '../Hoverable'
import TouchableOpacity from '../TouchableOpacity'
import View from '../View'

import styleSheet from './styles'

const pickRadioButtonStyles = ({ disabled, hovered, selected, styles }) => {
  if (disabled) {
    return styles.disabledRadioButton
  }
  if (selected) {
    if (hovered) {
      return styles.selectedHoveredRadioButton
    }
    return styles.selectedRadioButton
  }
  if (hovered) {
    return styles.hoveredRadioButton
  }
  return null
}

const buildStyleRadioButton = weakMemoize(
  (styles, disabled, hovered, selected, style) => [
    styles.radioButton,
    pickRadioButtonStyles({ disabled, hovered, selected, styles }),
    style
  ]
)

const pickInnerRadioButtonStyles = ({
  disabled,
  hovered,
  selected,
  styles
}) => {
  if (selected) {
    if (disabled) {
      return styles.selectedDisabledInnerRadioButton
    }
    if (hovered) {
      return styles.selectedHoveredInnerRadioButton
    }
    return styles.selectedInnerRadioButton
  }
}

const buildStyleInnerRadioButton = weakMemoize(
  (styles, disabled, hovered, selected) => [
    styles.innerRadioButton,
    pickInnerRadioButtonStyles({ disabled, hovered, selected, styles })
  ]
)

const enhance = compose(
  setDisplayName('RadioButton'),
  setPropTypes({
    editable: PropTypes.bool,
    onValueChange: PropTypes.func,
    style: styleShape,
    tabIndex: PropTypes.number,
    value: PropTypes.bool
  }),
  defaultProps({
    editable: true,
    onValueChange: noop,
    styles: styleSheet,
    value: false
  }),
  withState('hovered', 'setHovered', false),
  withPropsOnChange(['value', 'editable'], ({ editable, value }) => ({
    disabled: !editable,
    selected: value
  })),
  withPropsOnChange(
    ['selected', 'hovered', 'disabled', 'style'],
    ({ disabled, hovered, selected, style, styles }) => ({
      styleInnerRadioButton: buildStyleInnerRadioButton(
        styles,
        disabled,
        hovered,
        selected,
        style
      ),
      styleRadioButton: buildStyleRadioButton(
        styles,
        disabled,
        hovered,
        selected
      )
    })
  ),
  withHandlers({
    onHoverIn: ({ setHovered }) => () => setHovered(true),
    onHoverOut: ({ setHovered }) => () => setHovered(false),
    onPress: ({ onValueChange, value }) => () => onValueChange(!value)
  }),
  memo
)

const RadioButton = enhance(
  ({
    editable,
    onHoverIn,
    onHoverOut,
    onPress,
    styleInnerRadioButton,
    styleRadioButton,
    tabIndex
  }) => (
    <Hoverable
      disabled={!editable}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
    >
      <TouchableOpacity
        disabled={!editable}
        onPress={onPress}
        style={styleRadioButton}
        tabindex={tabIndex}
      >
        <View style={styleInnerRadioButton}></View>
      </TouchableOpacity>
    </Hoverable>
  )
)

export default RadioButton
