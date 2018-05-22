import PropTypes from 'prop-types'
import React from 'react'
import { Linking, StyleSheet } from 'react-native'
import { compose, setPropTypes, withHandlers, withProps } from 'recompose'
import TouchableHoverableOpacity from '../TouchableHoverableOpacity'

const enhance = compose(
  setPropTypes({
    href: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    style: PropTypes.object
  }),
  withProps(() => ({
    styles: StyleSheet.create({
      container: {
        color: '#07C'
      }
    })
  })),
  withHandlers({
    handleLongPress: ({ href, onLongPress }) => () => {
      if (onLongPress) {
        return onLongPress(href)
      }
    },
    handlePress: ({ href, onPress }) => () => {
      if (onPress) {
        return onPress(href)
      }
      Linking.canOpenURL(href)
        .then((supported) => supported && Linking.openURL(href))
    }
  })
)

export default enhance(({ handlePress, handleLongPress, ...props }) =>
  <Text {...props}
    onPress={handlePress}
    onLongPress={handleLongPress}/>
)
