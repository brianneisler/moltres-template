import { Colors, Styles } from '../../styles'
import { StyleSheet } from 'react-native'
import { compose, getPath } from '../../../utils/lang'
import {
  connect,
  defaultProps,
  setDisplayName,
  setPropTypes,
  withActions,
  withHandlers
} from '../../../utils/react'
import { goBackAction } from '../../modules/router/actions'
import { selectRouterLocation } from '../../modules/router/selectors'
import Icon from '../Icon'
import React from 'react'
import Text from '../Text'
import TouchableOpacity from '../TouchableOpacity'
import View from '../View'

const enhance = compose(
  setDisplayName('HeaderTopLeftNav'),
  setPropTypes({
    style: View.propTypes.style
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
