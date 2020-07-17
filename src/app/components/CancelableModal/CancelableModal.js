import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'

import { compose, noop } from '../../../utils/lang'
import {
  connect,
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape,
  withActions,
  withHandlers,
  withPropsOnChange,
  withState
} from '../../../utils/react'
import {
  actions as modalActions,
  selectModalVisible
} from '../../modules/modal'
import { StyleSheets } from '../../styles'
import Modal from '../Modal'
import TouchableWithoutFeedback from '../TouchableWithoutFeedback'
import View from '../View'

const enhance = compose(
  setDisplayName('CancelableModal'),
  setPropTypes({
    animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    onHide: PropTypes.func,
    onRequestCancel: PropTypes.func,
    onShow: PropTypes.func,
    overlayStyle: styleShape,
    style: styleShape
  }),
  defaultProps({
    disabled: false,
    onHide: noop,
    onShow: noop,
    styles: {
      ...StyleSheets,
      ...StyleSheet.create({
        modalContainer: {
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          width: '100%'
        }
      })
    }
  }),
  withActions({
    modalCancelled: modalActions.modalCancelled,
    requestCancelModal: modalActions.requestCancelModal,
    setModalCancelEnabled: modalActions.setModalCancelEnabled
  }),
  connect((state, { name }) => {
    const visible = selectModalVisible(name, state)
    return {
      visible
    }
  }),
  withState('modalVisible', 'setModalVisible', false),
  withPropsOnChange(
    ['visible'],
    ({ name, onHide, setModalCancelEnabled, setModalVisible, visible }) => {
      if (visible) {
        setModalVisible(true)
      } else {
        // TODO BRN: There is a race condition happening where this is still
        // completing when the property `visible` changes to true. Instead, we
        // need to add support for a state so that we can wait for the state to
        // change to visible and then start the hide
        setModalCancelEnabled(name, false)
          .then(() => onHide({ name }))
          .then(() => {
            setModalVisible(false)
          })
      }
    }
  ),
  withHandlers({
    handleModalDismiss: ({ modalCancelled, name, onCancel }) => () => {
      if (onCancel) {
        onCancel({ name })
      } else {
        modalCancelled(name)
      }
    },
    handleModalPress: ({
      disabled,
      name,
      onRequestCancel,
      requestCancelModal
    }) => () => {
      if (disabled) {
        return
      }
      if (onRequestCancel) {
        onRequestCancel({ name })
      } else {
        requestCancelModal(name)
      }
    },
    handleModalRequestClose: ({
      name,
      onRequestCancel,
      requestCancelModal
    }) => () => {
      if (onRequestCancel) {
        onRequestCancel({ name })
      } else {
        requestCancelModal(name)
      }
    },
    handleModalShow: ({ name, onShow, setModalCancelEnabled }) => async () => {
      await onShow({ name })
      await setModalCancelEnabled(name, true)
    }
  })
)

const CancelableModal = enhance(
  ({
    animationType,
    children,
    handleModalDismiss,
    handleModalPress,
    handleModalRequestClose,
    handleModalShow,
    modalVisible,
    overlayStyle,
    style,
    styles
  }) => (
    <Modal
      animationType={animationType}
      onDismiss={handleModalDismiss}
      onRequestClose={handleModalRequestClose}
      onShow={handleModalShow}
      transparent={true}
      visible={modalVisible}
    >
      <View style={[styles.modalContainer, style]}>
        <TouchableWithoutFeedback onPress={handleModalPress}>
          <View style={[styles.overlay, overlayStyle]} />
        </TouchableWithoutFeedback>
        {children}
      </View>
    </Modal>
  )
)

export default CancelableModal
