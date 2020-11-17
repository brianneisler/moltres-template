import { StatusLevel } from 'moltres/constants'
import { compose } from 'moltres/lang'
import {
  connect,
  defaultProps,
  getStyleHeight,
  setPropTypes,
  styleShape,
  withHandlers,
  withProps,
  withPropsOnChange,
  withState
} from 'moltres/react'
import React from 'react'
import { Easing, StyleSheet } from 'react-native'

import { selectCurrentStatus } from '../../modules/status'
import { Colors, Styles } from '../../styles'
import Animated from '../Animated'
import Text from '../Text'
import View from '../View'

const renderCurrentStatus = ({ currentStatus, styles }) => {
  if (!currentStatus) {
    return null
  }
  let statusStyle = styles.statusLevelInfo
  if (currentStatus.level === StatusLevel.WARN) {
    statusStyle = styles.statusLevelWarn
  } else if (currentStatus.level === StatusLevel.SUCCESS) {
    statusStyle = styles.statusLevelSuccess
  }
  return (
    <View style={styles.statusBox}>
      <View style={statusStyle}>
        {React.isValidElement(currentStatus.message) ? (
          currentStatus.message
        ) : (
          <Text style={[styles.text, styles.statusText]}>
            {currentStatus.message}
          </Text>
        )}
      </View>
    </View>
  )
}

const enhance = compose(
  setPropTypes({
    style: styleShape
  }),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        body: {
          flex: 1
        },
        statusBox: {
          alignItems: 'center',
          alignSelf: 'stretch',
          height: 40,
          justifyContent: 'center'
        },
        statusLevelInfo: {
          alignItems: 'center',
          alignSelf: 'stretch',
          backgroundColor: Colors.blueSecondary,
          borderRadius: 15,
          height: 30,
          justifyContent: 'center',
          margin: 5,
          shadowColor: '#000',
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 1
        },
        statusLevelSuccess: {
          alignItems: 'center',
          alignSelf: 'stretch',
          backgroundColor: Colors.greenPrimary,
          borderRadius: 15,
          height: 30,
          justifyContent: 'center',
          margin: 5,
          shadowColor: '#000',
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 1
        },
        statusLevelWarn: {
          alignItems: 'center',
          alignSelf: 'stretch',
          backgroundColor: Colors.warn,
          borderRadius: 15,
          height: 30,
          justifyContent: 'center',
          margin: 5,
          shadowColor: '#000',
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 1
        }
      })
    }
  }),
  connect((state) => ({
    status: selectCurrentStatus(state)
  })),
  withHandlers({
    calculateHeight: () => ({ currentStatus, styles }) => {
      let height = 0
      if (currentStatus) {
        height += getStyleHeight(styles, 'statusBox')
      }
      return height
    }
  }),
  withState('currentStatus', 'setCurrentStatus'),
  withProps(({ calculateHeight, ...rest }) => ({
    height: calculateHeight(rest)
  })),
  withPropsOnChange(['height'], ({ height }) => ({
    translateY: new Animated.Value(-height)
  })),
  withHandlers({
    hideStatus: ({ height, translateY }) => async () =>
      new Promise((resolve) =>
        Animated.timing(translateY, {
          duration: 250,
          toValue: -height
        }).start(resolve)
      ),
    showStatus: ({ translateY }) => async () =>
      new Promise((resolve) =>
        Animated.timing(translateY, {
          duration: 250,
          easing: Easing.in(Easing.ease),
          toValue: 0
        }).start(resolve)
      )
  }),
  withPropsOnChange(
    ['status'],
    ({ currentStatus, hideStatus, setCurrentStatus, showStatus, status }) => {
      if (status) {
        if (currentStatus) {
          hideStatus()
            .then(
              () =>
                new Promise((resolve) => {
                  setCurrentStatus(status, resolve)
                })
            )
            .then(() => showStatus())
        } else {
          setCurrentStatus(status, () => {
            showStatus()
          })
        }
      } else {
        hideStatus().then(() => {
          setCurrentStatus(status)
        })
      }
    }
  )
)

const StatusBar = enhance((props) => {
  const { height, style, styles, translateY } = props
  return (
    <Animated.View
      style={[styles.body, style, { height, transform: [{ translateY }] }]}
    >
      {renderCurrentStatus(props)}
    </Animated.View>
  )
})

export default StatusBar
