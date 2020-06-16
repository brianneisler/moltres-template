import { Fonts, Styles } from '../../styles'
import { Fragment, MetaTags, Text, View } from '../../components'
import { StyleSheet } from 'react-native'
import { compose } from '../../../utils/data'
import {
  connect,
  defaultProps,
  setDisplayName,
  withProps
} from '../../../utils/react'
import { material } from 'react-native-typography'
import { selectAppConfig } from '../../modules/app'
import { selectFacebookConfig } from '../../modules/facebook'
import { selectSSRConfig } from '../../../core'
import { selectTwitterConfig } from '../../modules/twitter'
import React from 'react'

const enhance = compose(
  setDisplayName('PrivacyPage'),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        b: {
          ...StyleSheet.flatten(material.body1),
          fontWeight: 'bold'
        },
        h1: {
          ...StyleSheet.flatten(material.display2),
          fontFamily: Fonts.primaryFontFamily,
          paddingBottom: 30
        },
        h3: {
          ...StyleSheet.flatten(material.headline),
          fontFamily: Fonts.primaryFontFamily,
          paddingBottom: 20
        },
        map: {
          alignSelf: 'center',
          marginTop: 50
        },
        p: {
          ...StyleSheet.flatten(material.body1),
          fontFamily: Fonts.primaryFontFamily,
          margin: 50
        }
      })
    }
  }),
  connect((state) => ({
    app: selectAppConfig(state),
    facebook: selectFacebookConfig(state),
    ssr: selectSSRConfig(state),
    twitter: selectTwitterConfig(state)
  })),
  withProps(({ app }) => {
    const description = `Privacy Policy`
    return {
      description,
      title: `${description} - ${app.name}`
    }
  })
)

const PrivacyPage = enhance(
  ({ app, description, facebook, ssr, styles, title, twitter }) => (
    <View style={styles.page}>
      <MetaTags>
        <title>{title}</title>
        {ssr ? (
          <Fragment>
            <meta
              content={description}
              name="description"
              property="description"
            />
            <meta content={description} property="og:description" />
            <meta content={app.name} property="og:site_name" />
            <meta content={title} property="og:title" />
            <meta content="website" property="og:type" />
            <meta content={`${app.url}`} property="og:url" />
            <meta content={facebook.appId} property="fb:app_id" />
            {/* TODO BRN: Not sure that this is the right type of twitter card */}
            <meta content="summary_large_image" property="twitter:card" />
            <meta content={twitter.username} property="twitter:site" />
            <meta content={description} property="twitter:image:alt" />
          </Fragment>
        ) : null}
      </MetaTags>
    </View>
  )
)

export default PrivacyPage
