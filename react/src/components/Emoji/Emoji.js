import { noop } from 'moltres-utils'
import emoji from 'node-emoji'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { compose, defaultProps, setPropTypes } from 'recompose'

const enhance = compose(
  setPropTypes({
    name: PropTypes.string.isRequired,
    onLongPress: PropTypes.func,
    onPress: PropTypes.func,
    style: Text.propTypes.style
  }),
  defaultProps({
    onLongPress: noop,
    onPress: noop,
    styles: StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center'
      }
    })
  })
)

export default enhance(({ name, ...rest }) => <Text {...rest}>{emoji.get(name)}</Text>)
