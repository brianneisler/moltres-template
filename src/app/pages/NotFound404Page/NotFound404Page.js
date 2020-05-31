import { ImageView, Link, MetaTags, Text, View } from '../../components'
import { StyleSheet } from 'react-native'
import { Styles } from '../../styles'
import { compose } from '../../../utils/data'
import { connect, defaultProps, setDisplayName, withProps } from '../../../utils/react'
import { selectAppConfig } from '../../modules/app'
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
  connect((state) => ({
    app: selectAppConfig(state)
  })),
  withProps(({ app }) => {
    return {
      title: `${app.name} - ?`
    }
  })
)

const NotFound404Page = enhance(({ styles, title }) => (
  <View style={styles.page}>
    <MetaTags>
      <title>{title}</title>
    </MetaTags>
    <Text style={styles.mediumText}>Say WAT?!</Text>
    <ImageView
      accessibilityLabel="The original WAT duck"
      imageHeight={333}
      imageWidth={500}
      style={styles.watDuckImage}
      uri="/assets/images/original-wat-duck.jpg"
    />
    <Link to="/">
      <Text style={styles.mediumText}>Back to home...</Text>
    </Link>
  </View>
))

export default NotFound404Page
