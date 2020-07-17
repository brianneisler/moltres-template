import { AuthState } from '../../../constants'
import { Colors, Styles } from '../../styles'
import { StyleSheet } from 'react-native'
import { buildLocation } from '../../../utils/url'
import { compose } from '../../../utils/lang'
import {
  connect,
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape,
  withPropsOnChange
} from '../../../utils/react'
import { selectAuthState, selectCurrentUser } from '../../modules/auth'
import { selectRouterLocationPathname } from '../../modules/router'
import Icon from '../Icon'
import Link from '../Link'
import React from 'react'
import Text from '../Text'
import TouchableOpacity from '../TouchableOpacity'

const USER_PATH = /^\/user\/([a-zA-Z0-9]*)\/?.*/

const enhance = compose(
  setDisplayName('HeaderTopRightNav'),
  setPropTypes({
    style: styleShape
  }),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        menuIcon: {
          color: Colors.whitePrimary,
          fontSize: 24,
          lineHeight: 30
        }
      })
    }
  }),
  connect((state) => ({
    authState: selectAuthState(state),
    currentUser: selectCurrentUser(state),
    pathname: selectRouterLocationPathname(state)
  })),
  withPropsOnChange(
    ['currentUser', 'pathname'],
    ({ currentUser, pathname }) => {
      const match = pathname.match(USER_PATH)
      const isPathCurrentUserProfile =
        currentUser && match ? currentUser.id === match[1] : false
      return {
        isPathCurrentUserProfile
      }
    }
  )
)

const HeaderTopRightNav = enhance(
  ({ authState, isPathCurrentUserProfile, pathname, style, styles }) => {
    if (authState !== AuthState.LOGGED_IN) {
      if (pathname !== '/login' && pathname !== '/login/code') {
        return (
          <Link
            style={StyleSheet.flatten([styles.link, styles.whiteButton, style])}
            to="/login"
          >
            <Text style={styles.whiteButtonText}>Login</Text>
          </Link>
        )
      }
    } else if (isPathCurrentUserProfile) {
      return (
        <Link
          to={buildLocation({
            pathname: '/menu',
            state: { back: true }
          })}
        >
          <TouchableOpacity style={[styles.inline, style]}>
            <Text style={styles.menuIcon}>
              <Icon icon="bars" />
            </Text>
          </TouchableOpacity>
        </Link>
      )
    }
    return null
  }
)

export default HeaderTopRightNav
