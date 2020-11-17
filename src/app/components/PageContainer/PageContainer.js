import { selectAppConfig, selectSSRConfig } from 'moltres/core'
import { compose, getProperty } from 'moltres/lang'
import {
  connect,
  defaultProps,
  memo,
  setDisplayName,
  setPropTypes,
  withProps
} from 'moltres/react'
import PropTypes from 'prop-types'
import React from 'react'

import { selectFacebookConfig } from '../../modules/facebook'
import { selectTwitterConfig } from '../../modules/twitter'
import { Styles } from '../../styles'
import Fragment from '../Fragment'
import MetaTags from '../MetaTags'
import View from '../View'

const enhance = compose(
  setDisplayName('Page'),
  setPropTypes({
    children: PropTypes.node.isRequired,
    description: PropTypes.string,
    robotsContent: PropTypes.string,
    title: PropTypes.string
  }),
  defaultProps({
    robotsContent: 'all',
    styles: Styles
  }),
  connect((state) => ({
    app: selectAppConfig(state),
    facebook: selectFacebookConfig(state),
    ssr: selectSSRConfig(state),
    twitter: selectTwitterConfig(state)
  })),
  withProps(({ app, description, title }) => ({
    description: description || app.description,
    title: title || `${app.description} - ${app.name}`
  })),
  memo
)

const PageContainer = enhance(
  ({
    app,
    children,
    description,
    facebook,
    robotsContent,
    ssr,
    styles,
    title,
    twitter
  }) => {
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
              {getProperty('appId', facebook) ? (
                <meta content={facebook.appId} property="fb:app_id" />
              ) : null}
              {/* TODO BRN: Not sure that this is the right type of twitter card */}
              <meta content="summary_large_image" property="twitter:card" />
              {getProperty('username', twitter) ? (
                <meta content={twitter.username} property="twitter:site" />
              ) : null}
              <meta content={description} property="twitter:image:alt" />
              <meta content={robotsContent} name="robots" />
            </Fragment>
          ) : null}
        </MetaTags>
        {children}
      </View>
    )
  }
)

export default PageContainer
