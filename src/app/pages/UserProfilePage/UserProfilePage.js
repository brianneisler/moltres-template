import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'

import { selectLoggerContext, selectSSRConfig } from '../../../core'
import { compose, getPathOr, getProp, getPropOr } from '../../../utils/lang'
import {
  connect,
  defaultProps,
  setDisplayName,
  setPropTypes,
  withActions,
  withHandlers,
  withProps
} from '../../../utils/react'
import {
  Fragment,
  Link,
  MetaTags,
  Text,
  TouchableOpacity,
  UserProfileImage,
  View
} from '../../components'
import { actions as alertActions } from '../../modules/alert'
import { selectAppConfig } from '../../modules/app'
import { selectFacebookConfig } from '../../modules/facebook'
import { pushRouteAction } from '../../modules/router/actions'
import { selectTwitterConfig } from '../../modules/twitter'
import { selectUserProfile } from '../../modules/user_profile'
import { Styles } from '../../styles'

const enhance = compose(
  setDisplayName('UserProfilePage'),
  setPropTypes({
    tab: PropTypes.string,
    userId: PropTypes.string.isRequired
  }),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        nameText: {
          fontSize: 30,
          fontWeight: 'bold'
        },
        profileBody: {
          maxWidth: 600,
          width: '100%'
        },
        profileHeader: {
          alignItems: 'flex-start',
          display: 'flex',
          justifyContent: 'center',
          maxWidth: 600,
          padding: 10,
          width: '100%'
        },
        profileImage: {
          margin: 25,
          marginLeft: 0
        },
        profileImageContainer: {
          justifyContent: 'flex-start',
          width: '100%'
        },
        profileLink: {
          marginLeft: 20,
          marginTop: 20
        },
        profileText: {
          marginBottom: 5
        }
      })
    },
    tab: 'wat'
  }),
  connect((state, { userId }) => ({
    app: selectAppConfig(state),
    facebook: selectFacebookConfig(state),
    logger: selectLoggerContext(state),
    ssr: selectSSRConfig(state),
    twitter: selectTwitterConfig(state),
    userProfile: selectUserProfile(userId, state)
  })),
  withProps(({ app, userFollow, userId, userProfile }) => {
    const description = getProp('name', userProfile) || 'Unknown'
    return {
      description,
      isFollowingUser: getProp('followingUserId', userFollow) === userId,
      title: `${description} - ${app.name}`
    }
  }),
  withActions({
    pushRoute: pushRouteAction,
    showAlertWithOptions: alertActions.showAlertWithOptions
  }),
  withHandlers({
    handleUserProfileImagePress: ({}) => () => {
      // TODO BRN: Show a full view of the user's profile image
    }
  })
)

const UserProfilePage = enhance(
  ({
    app,
    description,
    facebook,
    handleUserProfileImagePress,
    ssr,
    styles,
    tab,
    title,
    twitter,
    userId,
    userProfile
  }) => {
    // TODO BRN: Handle userProfile.error
    return (
      <View style={styles.page}>
        {/* TODO BRN: Move this into the `Page` component   */}
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
              <meta
                content={`${app.url}/content/userprofileimage/${getProp(
                  'userProfileImageId',
                  userProfile
                )}`}
                property="og:image"
              />
              <meta content="image/jpeg" property="og:image:type" />
              <meta content="100" property="og:image:width" />
              <meta content="100" property="og:image:height" />
              <meta content={description} property="og:image:alt" />
              <meta content={app.name} property="og:site_name" />
              <meta content={title} property="og:title" />
              <meta content="profile" property="og:type" />
              <meta content={`${app.url}/user/${userId}`} property="og:url" />
              <meta content={facebook.appId} property="fb:app_id" />
              <meta content="summary_large_image" property="twitter:card" />
              <meta content={twitter.username} property="twitter:site" />
              <meta content={description} property="twitter:image:alt" />
              {tab === 'images' || tab === 'reactions' ? (
                <meta content="noindex" name="robots" />
              ) : null}
            </Fragment>
          ) : null}
        </MetaTags>

        <View style={styles.profileHeader}>
          <View style={[styles.inlineContainer, styles.profileImageContainer]}>
            <TouchableOpacity
              onPress={handleUserProfileImagePress}
              // style={[styles.button, disabled ? styles.disabled : styles.enabled]}
            >
              <UserProfileImage
                size={100}
                style={styles.profileImage}
                userProfileImageId={getProp('userProfileImageId', userProfile)}
              />
            </TouchableOpacity>
            <View style={styles.fillContainer}>
              <View style={[styles.inlineContainer, styles.justifyContentEnd]}>
                <Link
                  style={StyleSheet.flatten([styles.link, styles.profileLink])}
                  to={{
                    pathname: `/user/${userId}/follows/followers`,
                    state: { back: true }
                  }}
                >
                  <Text style={styles.text}>{`${getPathOr(
                    0,
                    ['stats', 'data', 'numberFollowers'],
                    userProfile
                  )} followers`}</Text>
                </Link>
                <Link
                  style={StyleSheet.flatten([styles.link, styles.profileLink])}
                  to={{
                    pathname: `/user/${userId}/follows/following`,
                    state: { back: true }
                  }}
                >
                  <Text style={styles.text}>{`${getPathOr(
                    0,
                    ['stats', 'data', 'numberFollowing'],
                    userProfile
                  )} following`}</Text>
                </Link>
              </View>
            </View>
          </View>
          <Text style={[styles.text, styles.profileText, styles.nameText]}>
            {getPropOr('Unknown', 'name', userProfile)}
          </Text>
          <Text style={[styles.text, styles.profileText]}>
            {getPropOr('', 'bio', userProfile)}
          </Text>
          <Text style={[styles.text, styles.profileText]}>
            {getPropOr('', 'location', userProfile)}
          </Text>
          <Text style={[styles.text, styles.profileText]}>
            {getPropOr('', 'website', userProfile)}
          </Text>
        </View>
        <View style={styles.profileBody}>
          <View style={[styles.tabs, styles.tabsSticky]}>
            <Link
              replace={true}
              style={StyleSheet.flatten([
                styles.link,
                styles.tab,
                tab === 'wat' ? styles.tabSelected : null
              ])}
              to={`/user/${userId}`}
            >
              <Text
                style={[
                  styles.tabText,
                  tab === 'wat' ? styles.tabSelectedText : null
                ]}
              >
                {'WATs'}
              </Text>
            </Link>
            <Link
              replace={true}
              style={StyleSheet.flatten([
                styles.link,
                styles.tab,
                tab === 'images' ? styles.tabSelected : null
              ])}
              to={`/user/${userId}/images`}
            >
              <Text
                style={[
                  styles.tabText,
                  tab === 'images' ? styles.tabSelectedText : null
                ]}
              >
                {'Images'}
              </Text>
            </Link>
            <Link
              replace={true}
              style={StyleSheet.flatten([
                styles.link,
                styles.tab,
                tab === 'reactions' ? styles.tabSelected : null
              ])}
              to={`/user/${userId}/reactions`}
            >
              <Text
                style={[
                  styles.tabText,
                  tab === 'reactions' ? styles.tabSelectedText : null
                ]}
              >
                {'Reactions'}
              </Text>
            </Link>
          </View>
        </View>
      </View>
    )
  }
)

export default UserProfilePage
