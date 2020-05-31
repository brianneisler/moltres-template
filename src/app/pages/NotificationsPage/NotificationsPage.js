import { Fragment, MetaTags, NotificationList, View } from '../../components'
import { Styles } from '../../styles'
import { compose } from '../../../utils/data'
import { connect, defaultProps, setDisplayName, withProps } from '../../../utils/react'
import { selectAppConfig } from '../../modules/app'
import { selectCurrentUser } from '../../modules/auth'
import { selectFacebookConfig } from '../../modules/facebook'
import { selectSSRConfig } from '../../../core'
import { selectTwitterConfig } from '../../modules/twitter'
import React from 'react'

const enhance = compose(
  setDisplayName('NotificationsPage'),
  defaultProps({
    styles: Styles
  }),
  connect((state) => ({
    app: selectAppConfig(state),
    currentUser: selectCurrentUser(state),
    facebook: selectFacebookConfig(state),
    ssr: selectSSRConfig(state),
    twitter: selectTwitterConfig(state)
  })),
  withProps(({ app }) => {
    const description = `Your Notifications`
    return {
      description,
      title: `${description} - ${app.name}`
    }
  })
)

const NotificationPage = enhance(
  ({ app, currentUser, description, facebook, ssr, styles, title, twitter }) => {
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
              <meta content="noindex" name="robots" />
            </Fragment>
          ) : null}
        </MetaTags>
        <NotificationList userId={currentUser.id} />
      </View>
    )
  }
)

export default NotificationPage
