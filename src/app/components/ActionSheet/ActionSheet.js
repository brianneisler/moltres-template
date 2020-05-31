import { ACTION_SHEET } from '../../../constants/Modal'
import { Colors, Constants, Styles } from '../../styles'
import { Easing, InteractionManager, StyleSheet } from 'react-native'
import { compose, isUndefined } from '../../../utils/data'
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
import Animated from '../Animated'
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
        <Text style={[styles.text, styles.titleText]}>{title}</Text>
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

const createButton = ({
  cancelButtonIndex,
  destructiveButtonIndex,
  index,
  onPress,
  styles,
  title
}) => {
  const fontColor = destructiveButtonIndex === index ? Colors.warn : Colors.tint
  const buttonBoxStyle = cancelButtonIndex === index ? styles.cancelButtonBox : styles.buttonBox
  return (
    <TouchableHighlight
      activeOpacity={1}
      key={index}
      onPress={() => onPress(index)}
      style={buttonBoxStyle}
      underlayColor={Colors.buttonUnderlay}
    >
      {React.isValidElement(title) ? (
        title
      ) : (
        <Text style={[styles.mediumText, { color: fontColor }]}>{title}</Text>
      )}
    </TouchableHighlight>
  )
}

const renderCancelButton = ({
  cancelButtonIndex,
  destructiveButtonIndex,
  onPress,
  options,
  styles
}) => {
  if (isUndefined(cancelButtonIndex)) {
    return null
  }
  return createButton({
    cancelButtonIndex,
    destructiveButtonIndex,
    index: cancelButtonIndex,
    onPress,
    styles,
    title: options[cancelButtonIndex]
  })
}

const renderOptions = ({ cancelButtonIndex, destructiveButtonIndex, onPress, options, styles }) => {
  return options.map((title, index) => {
    return cancelButtonIndex === index
      ? null
      : createButton({ cancelButtonIndex, destructiveButtonIndex, index, onPress, styles, title })
  })
}

const enhance = compose(
  setDisplayName('ActionSheet'),
  setPropTypes({
    cancelButtonIndex: PropTypes.number,
    destructiveButtonIndex: PropTypes.number,
    message: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    title: PropTypes.string
  }),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        body: {
          alignSelf: 'flex-end',
          backgroundColor: '#e5e5e5',
          flex: 1
        },
        buttonBox: {
          alignItems: 'center',
          backgroundColor: Colors.whitePrimary,
          height: 50,
          justifyContent: 'center',
          marginTop: Constants.hairlineWidth
        },
        cancelButtonBox: {
          alignItems: 'center',
          backgroundColor: Colors.whitePrimary,
          height: 50,
          justifyContent: 'center',
          marginTop: 6
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
          fontSize: 12
        },
        modal: {
          flexDirection: 'row'
        },
        titleBox: {
          alignItems: 'center',
          backgroundColor: Colors.whitePrimary,
          height: 40,
          justifyContent: 'center'
        },
        titleText: {
          color: '#757575',
          fontSize: 14
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
    calculateHeight: ({ cancelButtonIndex, maxHeight, options, setScrollEnabled, styles }) => ({
      message,
      title
    }) => {
      let height = 0
      if (title) {
        height += getStyleHeight(styles, 'titleBox')
      }
      if (message) {
        height += getStyleHeight(styles, 'messageBox')
      }
      if (!isUndefined(cancelButtonIndex)) {
        height += getStyleHeight(styles, 'cancelButtonBox')
        height += (options.length - 1) * getStyleHeight(styles, 'buttonBox')
      } else {
        height += options.length * getStyleHeight(styles, 'buttonBox')
      }

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
  withPropsOnChange(['height'], ({ height }) => ({
    translateY: new Animated.Value(height)
  })),
  withHandlers({
    hideSheet: ({ height, translateY }) => async () =>
      new Promise((resolve) =>
        Animated.timing(translateY, {
          duration: 200,
          toValue: height
        }).start(resolve)
      ),
    showSheet: ({ translateY }) => async () =>
      new Promise((resolve) =>
        Animated.timing(translateY, {
          duration: 250,
          easing: Easing.out(Easing.ease),
          toValue: 0
        }).start(resolve)
      )
  }),
  withHandlers({
    handleModalCancel: ({ cancelButtonIndex, onPress }) => () => {
      if (!isUndefined(cancelButtonIndex)) {
        onPress(cancelButtonIndex)
      }
    },
    handleModalHide: ({ hideSheet }) => async () => hideSheet(),
    handleModalRequestCancel: ({ requestCancelModal }) => () => requestCancelModal(ACTION_SHEET),
    handleModalShow: ({ showSheet }) => async () => showSheet()
  })
)

const ActionSheet = enhance((props) => {
  const {
    handleModalCancel,
    handleModalHide,
    handleModalRequestCancel,
    handleModalShow,
    height,
    scrollEnabled,
    styles,
    translateY
  } = props
  return (
    <CancelableModal
      animationType="none"
      name={ACTION_SHEET}
      onCancel={handleModalCancel}
      onHide={handleModalHide}
      onRequestCancel={handleModalRequestCancel}
      onShow={handleModalShow}
      style={styles.modal}
    >
      <Animated.View style={[styles.body, { height, transform: [{ translateY }] }]}>
        {renderTitle(props)}
        {renderMessage(props)}
        <ScrollView scrollEnabled={scrollEnabled}>{renderOptions(props)}</ScrollView>
        {renderCancelButton(props)}
      </Animated.View>
    </CancelableModal>
  )
})

export default ActionSheet
