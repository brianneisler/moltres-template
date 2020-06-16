import { AuthState, Overlay } from '../../../constants'
import {
  FileInput,
  Icon,
  Link,
  Text,
  TouchableOpacity,
  UserProfileImage,
  View
} from '..'
import { StyleSheet } from 'react-native'
import { Styles } from '../../styles'
import { buildLocation, buildURL, parseSearch } from '../../../utils/url'
import { compose, getProp } from '../../../utils/data'
import {
  connect,
  defaultProps,
  setDisplayName,
  withActions,
  withHandlers
} from '../../../utils/react'
import { isDeviceMobile } from '../../../utils/platform'
import { actions as overlayActions } from '../../modules/overlay'
import { selectAuthState, selectCurrentUser } from '../../modules/auth'
import { selectCurrentUserProfile } from '../../modules/user_profile'
import React from 'react'

const enhance = compose(
  setDisplayName('MainNav'),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        imageUploadInput: {
          cursor: 'pointer',
          height: '100%',
          opacity: 0,
          position: 'absolute',
          top: 0,
          width: '100%'
        },
        navIcon: {
          color: 'rgba(0, 0, 0, 0.50)',
          fontSize: 36
        },
        navLink: {
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center'
        },
        navLinks: {
          flexDirection: 'row',
          maxWidth: 600,
          width: '100%'
        }
      })
    }
  }),
  withActions({
    showOverlay: overlayActions.showOverlay
  }),
  connect((state) => ({
    authState: selectAuthState(state),
    currentUser: selectCurrentUser(state),
    currentUserProfile: selectCurrentUserProfile(state)
  })),
  withHandlers({
    handleFileInputChange: ({ showOverlay }) => (imageFile) => {
      showOverlay(Overlay.WAT_THIS_UPLOAD, { imageFile })
    }
  })
)

const MainNav = enhance(
  ({
    authState,
    currentUser,
    currentUserProfile,
    handleFileInputChange,
    styles
  }) => {
    return (
      <View style={styles.navLinks}>
        <View style={styles.navLink}>
          <Link to={`/`}>
            <TouchableOpacity>
              <Text style={[styles.navIcon]}>
                <Icon icon="home" />
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.navLink} />
        <View style={styles.navLink}>
          <TouchableOpacity>
            {authState === AuthState.LOGGED_IN ? (
              isDeviceMobile() ? (
                <FileInput
                  accept="image/*"
                  inputStyle={[styles.imageUploadInput]}
                  onChange={handleFileInputChange}
                >
                  <Text style={[styles.navIcon]}>
                    <Icon icon="plus-square" />
                  </Text>
                </FileInput>
              ) : (
                <Link
                  to={buildLocation((location) => ({
                    ...location,
                    query: {
                      ...parseSearch(location.search),
                      showOverlay: {
                        name: Overlay.WAT_THIS_UPLOAD
                      }
                    }
                  }))}
                >
                  <Text style={[styles.navIcon]}>
                    <Icon icon="plus-square" />
                  </Text>
                </Link>
              )
            ) : (
              <Link
                to={buildLocation((location) => ({
                  pathname: '/login',
                  query: {
                    afterLogin: {
                      redirect: buildURL(location),
                      showOverlay: Overlay.WAT_THIS_UPLOAD
                    }
                  },
                  state: {
                    back: true
                  }
                }))}
              >
                <Text style={[styles.navIcon]}>
                  <Icon icon="plus-square" />
                </Text>
              </Link>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.navLink}>
          {authState === AuthState.LOGGED_IN ? (
            <Link to={`/notifications`}>
              <TouchableOpacity>
                <Text style={[styles.navIcon]}>
                  <Icon icon={'bell'} />
                </Text>
              </TouchableOpacity>
            </Link>
          ) : null}
        </View>
        <View style={styles.navLink}>
          {authState === AuthState.LOGGED_IN ? (
            <Link to={`/user/${getProp('id', currentUser)}`}>
              <TouchableOpacity>
                <UserProfileImage
                  size={34}
                  style={styles.smallProfileImage}
                  userProfileImageId={
                    currentUserProfile
                      ? currentUserProfile.userProfileImageId
                      : null
                  }
                />
              </TouchableOpacity>
            </Link>
          ) : null}
        </View>
      </View>
    )
  }
)

export default MainNav
