import { compose } from 'moltres/lang'
import { defaultProps, setDisplayName, setPropTypes } from 'moltres/react'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'

import { Colors, Styles } from '../../styles'
import Link from '../Link'
import Text from '../Text'
import TouchableOpacity from '../TouchableOpacity'
import UserProfileImage from '../UserProfileImage'

const enhance = compose(
  setDisplayName('NotificationUserProfileImageView'),
  setPropTypes({
    linkTo: PropTypes.object,
    message: PropTypes.string,
    // style: styleShape,
    userProfileImageId: PropTypes.string
  }),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        content: {
          backgroundColor: Colors.whitePrimary,
          borderColor: Colors.black4,
          borderWidth: 1,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%'
        },
        footer: {
          alignItems: 'center',
          backgroundColor: Colors.whitePrimary,
          borderBottomWidth: 1,
          borderColor: Colors.black4,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%'
        },
        header: {
          alignItems: 'center',
          backgroundColor: Colors.whitePrimary,
          borderColor: Colors.black4,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopWidth: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%'
        },
        listContainer: {
          alignItems: 'stretch',
          flexDirection: 'column',
          marginTop: 15,
          maxWidth: 600,
          width: '100%'
        },
        menuButton: {
          marginLeft: 'auto',
          marginRight: 20
        },
        userFollowBadge: {
          alignItems: 'center',
          backgroundColor: Colors.black4,
          borderRadius: 3,
          paddingBottom: 2,
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 2
        },
        userFollowBlock: {
          flexDirection: 'row'
        },
        userFollowButton: {
          margin: 8
        },
        userFollowButtonContainer: {
          justifyContent: 'center',
          marginLeft: 'auto'
        },
        userProfileDetailsBlock: {
          alignItems: 'flex-start'
        },
        userProfileNameText: {
          fontWeight: 'bold'
        }
      })
    }
  })
)

const NotificationUserProfileImageView = enhance(
  ({ linkTo, message, styles, userProfileImageId }) => {
    return (
      <Link
        style={StyleSheet.flatten([
          styles.link,
          styles.inlineCenter,
          styles.userProfileImage
        ])}
        to={{
          pathname: linkTo,
          state: { back: true }
        }}
      >
        <TouchableOpacity style={[styles.inline]}>
          <UserProfileImage
            size={75}
            style={styles.smallProfileImage}
            userProfileImageId={userProfileImageId}
          />
          {React.isValidElement(message) ? message : <Text>{message}</Text>}
        </TouchableOpacity>
      </Link>
    )
  }
)

export default NotificationUserProfileImageView
