import { Fragment, HomeStreamEntityList, MetaTags, View } from '..'
import { Styles } from '../../styles'
import { compose } from '../../../utils/lang'
import {
  connect,
  defaultProps,
  setDisplayName,
  setPropTypes,
  withProps
} from '../../../utils/react'
import { selectAppConfig } from '../../modules/app'
import { selectFacebookConfig } from '../../modules/facebook'
import { selectSSRConfig } from '../../../core'
import { selectTwitterConfig } from '../../modules/twitter'
import PropTypes from 'prop-types'
import React from 'react'

const enhance = compose(
  setDisplayName('Page'),
  setPropTypes({
    pageId: PropTypes.string.isRequired,
    tab: PropTypes.string
  }),
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

const Page = enhance(
  ({ app, description, facebook, ssr, styles, title, twitter }) => {
    return (
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
  }
)

export default Page
