import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'

import { compose } from '../../../utils/lang'
import {
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape,
  withProps
} from '../../../utils/react'
import Image from '../Image'
import View from '../View'

const enhance = compose(
  setDisplayName('UserProfileImage'),
  setPropTypes({
    size: PropTypes.number,
    style: styleShape,
    userProfileImageId: PropTypes.string
  }),
  defaultProps({
    size: 50,
    styles: StyleSheet.create({
      container: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      image: {
        alignSelf: 'center',
        flex: 1
      }
    })
  }),
  withProps(({ size }) => ({
    height: size,
    imageSizeStyles: {
      height: size,
      width: size
    },
    width: size
  }))
)

const ProfileImage = ({ height, style, userProfileImageId, width }) => (
  <Image
    defaultSource={{ uri: `/content/userprofileimage/${userProfileImageId}` }}
    height={height}
    resizeMode={'contain'}
    source={{ uri: `/content/userprofileimage/${userProfileImageId}` }}
    style={style}
    width={width}
  />
)

const DefaultProfileImage = ({ height, style, width }) => (
  <Image
    defaultSource={{ uri: '/assets/images/wat-duck-profile-greyscale.png' }}
    height={height}
    resizeMode={'contain'}
    source={{ uri: '/assets/images/wat-duck-profile-greyscale.png' }}
    style={style}
    width={width}
  />
)

const UserProfileImage = enhance(
  ({ height, imageSizeStyles, style, styles, userProfileImageId, width }) => {
    return (
      <View style={style}>
        {userProfileImageId ? (
          <ProfileImage
            height={height}
            style={[styles.image, imageSizeStyles]}
            userProfileImageId={userProfileImageId}
            width={width}
          />
        ) : (
          <DefaultProfileImage
            height={height}
            style={[styles.image, imageSizeStyles]}
            width={width}
          />
        )}
      </View>
    )
  }
)

export default UserProfileImage
