import { compose, noop } from 'moltres/lang'
import {
  defaultProps,
  memo,
  setDisplayName,
  setPropTypes,
  styleShape,
  withHandlers,
  withState
} from 'moltres/react'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'

import { Colors } from '../../styles'
import Hoverable from '../Hoverable'
import Icon from '../Icon'
import Text from '../Text'
import TouchableOpacity from '../TouchableOpacity'

const enhance = compose(
  setDisplayName('CloseButton'),
  setPropTypes({
    buttonStyle: styleShape,
    onPress: PropTypes.func,
    style: styleShape
  }),
  defaultProps({
    onClick: noop,
    styles: StyleSheet.create({
      closeButton: {
        position: 'absolute',
        right: 20,
        top: 20
      },
      closeIcon: {
        color: Colors.grey60,
        fontSize: 16
      },
      hoveredCloseIcon: {
        color: Colors.grey70
      }
    })
  }),
  // TODO BRN: Make this a react util that uses the Hoverable as a HOC
  withState('hovered', 'setHovered', false),
  withHandlers({
    onHoverIn: ({ setHovered }) => () => setHovered(true),
    onHoverOut: ({ setHovered }) => () => setHovered(false)
  }),
  memo
)

const CloseButton = enhance(
  ({ buttonStyle, hovered, onHoverIn, onHoverOut, onPress, style, styles }) => (
    <Hoverable onHoverIn={onHoverIn} onHoverOut={onHoverOut}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.closeButton, buttonStyle]}
      >
        <Text
          style={[styles.closeIcon, style, hovered && styles.hoveredCloseIcon]}
        >
          <Icon icon="times" />
        </Text>
      </TouchableOpacity>
    </Hoverable>
  )
)

export default CloseButton
