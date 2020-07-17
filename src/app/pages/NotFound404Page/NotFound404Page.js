import React from 'react'
import { StyleSheet } from 'react-native'

import { compose } from '../../../utils/lang'
import { defaultProps, memo, setDisplayName } from '../../../utils/react'
import { Link, Page, Text } from '../../components'
import { Styles } from '../../styles'

const enhance = compose(
  setDisplayName('NotFound404Page'),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        watDuckImage: {
          maxWidth: 800
        }
      })
    }
  }),
  memo
)

const NotFound404Page = enhance(({ styles }) => (
  <Page description="?">
    <Text style={styles.mediumText}>Page not found!</Text>
    <Link to="/">
      <Text style={styles.mediumText}>Back to home...</Text>
    </Link>
  </Page>
))

export default NotFound404Page
