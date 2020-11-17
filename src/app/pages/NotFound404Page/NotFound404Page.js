import { compose } from 'moltres/lang'
import { defaultProps, memo, setDisplayName } from 'moltres/react'
import React from 'react'
import { StyleSheet } from 'react-native'

import { Link, PageContainer, Text } from '../../components'
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
  <PageContainer description="?">
    <Text style={styles.mediumText}>Page not found!</Text>
    <Link to="/">
      <Text style={styles.mediumText}>Back to home...</Text>
    </Link>
  </PageContainer>
))

export default NotFound404Page
