import { compose, getPath } from 'moltres/lang'
import {
  connect,
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape,
  withActions,
  withHandlers
} from 'moltres/react'
import React from 'react'
import { StyleSheet } from 'react-native'

import { goBackAction } from '../../modules/router/actions'
import { selectRouterLocation } from '../../modules/router/selectors'
import { Colors, Styles } from '../../styles'
import Icon from '../Icon'
import Text from '../Text'
import TouchableOpacity from '../TouchableOpacity'

const enhance = compose(
  setDisplayName('HeaderTopLeftNav'),
  setPropTypes({
    style: styleShape
  }),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        backIcon: {
          color: Colors.whitePrimary,
          paddingRight: 10
        }
      })
    }
  }),
  withActions({
    goBack: goBackAction
  }),
  connect((state) => ({
    routerLocation: selectRouterLocation(state)
  })),
  withHandlers({
    handleBackButton: ({ goBack }) => () => {
      goBack()
    }
  })
)

const HeaderTopLeftNav = enhance(
  ({ handleBackButton, routerLocation, style, styles }) => {
    if (!!getPath(['state', 'back'], routerLocation)) {
      return (
        <TouchableOpacity
          onPress={handleBackButton}
          style={[styles.inline, style]}
        >
          <Text style={styles.backIcon}>
            <Icon icon="chevron-left" />
          </Text>
          <Text style={[styles.text, styles.whiteButtonText]}>{'Back'}</Text>
        </TouchableOpacity>
      )
    }
    return null
  }
)

export default HeaderTopLeftNav
