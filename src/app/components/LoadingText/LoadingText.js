import React from 'react'
import { StyleSheet } from 'react-native'

import { compose } from '../../../utils/lang'
import {
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape
} from '../../../utils/react'
import { Colors, Styles } from '../../styles'
import View from '../View'

const enhance = compose(
  setDisplayName('LoadingText'),
  setPropTypes({
    style: styleShape
  }),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        loadingText: {
          backgroundColor: Colors.black4,
          borderRadius: 2,
          height: 10,
          margin: 3
        },
        loadingTextBlock: {
          alignSelf: 'center',
          justifyContent: 'flex-start',
          width: '100%'
        }
      })
    }
  })
)

const LoadingText = enhance(({ style, styles }) => (
  <View style={[styles.loadingTextBlock, style]}>
    <View style={styles.loadingText} />
    <View style={styles.loadingText} />
  </View>
))

export default LoadingText
