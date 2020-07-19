import PropTypes from 'prop-types'
import React from 'react'
import { Linking, StyleSheet } from 'react-native'

import { compose } from '../../../utils/lang'
import {
  setDisplayName,
  setPropTypes,
  withHandlers,
  withProps
} from '../../../utils/react'
import Text from '../Text'
// import TouchableHoverableOpacity from '../TouchableHoverableOpacity'

const enhance = compose(
  setDisplayName('Hyperlink'),
  setPropTypes({
    href: PropTypes.object.isRequired,
    onLongPress: PropTypes.func,
    onPress: PropTypes.func,
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
      Linking.canOpenURL(href).then(
        (supported) => supported && Linking.openURL(href)
      )
    }
  })
)

export default enhance(({ handleLongPress, handlePress, ...props }) => (
  <Text {...props} onLongPress={handleLongPress} onPress={handlePress} />
))
