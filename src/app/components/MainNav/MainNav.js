import React from 'react'
import { StyleSheet } from 'react-native'

import { Icon, Link, Text, TouchableOpacity, UserProfileImage, View } from '..'
import { AuthState } from '../../../constants'
import { compose, getProp } from '../../../utils/lang'
import { connect, defaultProps, setDisplayName } from '../../../utils/react'
import { selectAuthState, selectCurrentUser } from '../../modules/auth'
import { selectCurrentUserProfile } from '../../modules/user_profile'
import { Styles } from '../../styles'

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
  connect((state) => ({
    authState: selectAuthState(state),
    currentUser: selectCurrentUser(state),
    currentUserProfile: selectCurrentUserProfile(state)
  }))
)

const MainNav = enhance(
  ({ authState, currentUser, currentUserProfile, styles }) => {
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
        <View style={styles.navLink} />
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
