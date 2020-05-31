import { ALERT } from '../../../constants/Modal'
import { Colors, Constants, Styles } from '../../styles'
import { InteractionManager, StyleSheet } from 'react-native'
import { assocProp, compose, getProp, mapIndexed } from '../../../utils/data'
import {
  connect,
  defaultProps,
  getStyleHeight,
  setDisplayName,
  setPropTypes,
  withActions,
  withHandlers,
  withProps,
  withPropsOnChange,
  withState
} from '../../../utils/react'
import { actions as modalActions } from '../../modules/modal'
import { selectDimensionsWindowHeight } from '../../modules/dimensions'
import CancelableModal from '../CancelableModal'
import PropTypes from 'prop-types'
import React from 'react'
import ScrollView from '../ScrollView'
import Text from '../Text'
import TouchableHighlight from '../TouchableHighlight'
import View from '../View'

const renderTitle = ({ styles, title }) => {
  if (!title) {
    return null
  }
  return (
    <View style={styles.titleBox}>
      {React.isValidElement(title) ? (
        title
      ) : (
        <Text style={[styles.mediumText, styles.titleText]}>{title}</Text>
      )}
    </View>
  )
}

const renderMessage = ({ message, styles }) => {
  if (!message) {
    return null
  }
  return (
    <View style={styles.messageBox}>
      {React.isValidElement(message) ? (
        message
      ) : (
        <Text style={[styles.text, styles.messageText]}>{message}</Text>
      )}
    </View>
  )
}

const renderButton = ({ key, onPress, style, styles, text, type }) => {
  const fontColor = type === 'destructive' ? Colors.warn : Colors.tint
  return (
    <TouchableHighlight
      activeOpacity={1}
      key={`Alert-${key}`}
      onPress={onPress}
      style={[styles.buttonBox, style]}
      underlayColor={Colors.buttonUnderlay}
    >
      {React.isValidElement(text) ? (
        text
      ) : (
        <Text style={[styles.mediumText, { color: fontColor }]}>{text}</Text>
      )}
    </TouchableHighlight>
  )
}

const renderButtons = ({ buttons, options, styles }) => {
  let flexDirection = 'row'
  let firstButtonStyle = {}
  if (buttons.length > 2) {
    flexDirection = 'column'
  } else if (buttons.length === 2) {
    firstButtonStyle = assocProp('marginRight', Constants.hairlineWidth, firstButtonStyle)
  }

  return (
    <View
      style={{
        flexDirection
      }}
    >
      {mapIndexed(
        (button, index) =>
          renderButton({
            ...button,
            key: index,
            options,
            style: index === 0 ? firstButtonStyle : null,
            styles
          }),
        buttons
      )}
    </View>
  )
}

const enhance = compose(
  setDisplayName('Alert'),
  setPropTypes({
    buttons: PropTypes.array.isRequired,
    message: PropTypes.string,
    options: PropTypes.object,
    title: PropTypes.string
  }),
  defaultProps({
    options: {
      cancelable: true
    },
    styles: {
      ...Styles,
      ...StyleSheet.create({
        alertBlock: {
          borderRadius: 10,
          overflow: 'hidden'
        },
        alertContainer: {
          alignItems: 'center',
          justifyContent: 'center'
        },
        body: {
          alignSelf: 'flex-end',
          backgroundColor: '#e5e5e5',
          flex: 1
        },
        buttonBox: {
          alignItems: 'center',
          backgroundColor: Colors.whitePrimary,
          flex: 1,
          height: 50,
          justifyContent: 'center',
          marginTop: Constants.hairlineWidth
        },
        messageBox: {
          alignItems: 'center',
          backgroundColor: Colors.whitePrimary,
          height: 30,
          justifyContent: 'center',
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10
        },
        messageText: {
          color: '#9a9a9a',
          fontSize: 14
        },
        modal: {
          justifyContent: 'center'
        },
        titleBox: {
          alignItems: 'center',
          backgroundColor: Colors.whitePrimary,
          height: 40,
          justifyContent: 'center'
        },
        titleText: {
          fontWeight: 'bold'
        }
      })
    }
  }),
  withActions({
    requestCancelModal: modalActions.requestCancelModal
  }),
  withState('scrollEnabled', 'setScrollEnabled', false),
  connect((state) => ({
    windowHeight: selectDimensionsWindowHeight(state)
  })),
  withPropsOnChange(['windowHeight'], ({ windowHeight }) => ({
    maxHeight: Math.round(windowHeight * 0.7)
  })),
  withHandlers({
    calculateHeight: ({ buttons, maxHeight, setScrollEnabled, styles }) => ({ message, title }) => {
      let height = 0
      if (title) {
        height += getStyleHeight(styles, 'titleBox')
      }
      if (message) {
        height += getStyleHeight(styles, 'messageBox')
      }
      height += buttons.length * getStyleHeight(styles, 'buttonBox')

      if (height > maxHeight) {
        InteractionManager.runAfterInteractions(() => {
          setScrollEnabled(true)
        })
        height = maxHeight
      } else {
        InteractionManager.runAfterInteractions(() => {
          setScrollEnabled(false)
        })
      }

      return height
    }
  }),
  withProps(({ calculateHeight, ...rest }) => ({
    height: calculateHeight(rest)
  })),
  withHandlers({
    handleModalRequestCancel: ({ options, requestCancelModal }) => ({ name }) => {
      if (getProp('cancelable', options)) {
        requestCancelModal(name)
      }
    }
  })
)

const Alert = enhance((props) => {
  const { handleModalRequestCancel, scrollEnabled, styles } = props
  return (
    <CancelableModal
      animationType="fade"
      name={ALERT}
      onRequestCancel={handleModalRequestCancel}
      style={styles.modal}
    >
      <View style={styles.alertContainer}>
        <ScrollView contentContainerStyle={styles.alertBlock} scrollEnabled={scrollEnabled}>
          {renderTitle(props)}
          {renderMessage(props)}
          {renderButtons(props)}
        </ScrollView>
      </View>
    </CancelableModal>
  )
})

export default Alert
