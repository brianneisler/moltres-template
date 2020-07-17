import { Link, Page, Text } from '../../components'
import { StyleSheet } from 'react-native'
import { Styles } from '../../styles'
import { compose } from '../../../utils/lang'
import { defaultProps, memo, setDisplayName } from '../../../utils/react'
import React from 'react'

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
