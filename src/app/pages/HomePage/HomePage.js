import { Fragment, HomeStreamEntityList, MetaTags, View } from '../../components'
import { Styles } from '../../styles'
import { compose } from '../../../utils/data'
import { connect, defaultProps, setDisplayName, withProps } from '../../../utils/react'
import { selectAppConfig } from '../../modules/app'
import { selectFacebookConfig } from '../../modules/facebook'
import { selectSSRConfig } from '../../../core'
import { selectTwitterConfig } from '../../modules/twitter'
import React from 'react'

const enhance = compose(
  setDisplayName('HomePage'),
  defaultProps({
    styles: Styles
  }),
  connect((state) => ({
    app: selectAppConfig(state),
    facebook: selectFacebookConfig(state),
    ssr: selectSSRConfig(state),
    twitter: selectTwitterConfig(state)
  })),
  withProps(({ app }) => ({
    description: app.description,
    title: `${app.description} - ${app.name}`
  }))
)

const HomePage = enhance(({ app, description, facebook, ssr, styles, title, twitter }) => {
  return (
    <View style={styles.page}>
      <MetaTags>
        <title>{title}</title>
        {ssr ? (
          <Fragment>
            <meta content={description} name="description" property="description" />
            <meta content={description} property="og:description" />
            <meta content={app.name} property="og:site_name" />
            <meta content={title} property="og:title" />
            <meta content="website" property="og:type" />
            <meta content={app.url} property="og:url" />
            <meta content={facebook.appId} property="fb:app_id" />
            {/* TODO BRN: Not sure that this is the right type of twitter card */}
            <meta content="summary_large_image" property="twitter:card" />
            <meta content={twitter.username} property="twitter:site" />
            <meta content={description} property="twitter:image:alt" />
          </Fragment>
        ) : null}
      </MetaTags>
      <HomeStreamEntityList />
    </View>
  )
})

export default HomePage
