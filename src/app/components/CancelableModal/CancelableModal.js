import { StyleSheet } from 'react-native'
import { Styles } from '../../styles'
import { compose, getProp, noop } from '../../../utils/data'
import {
  connect,
  defaultProps,
  setDisplayName,
  setPropTypes,
  withActions,
  withHandlers,
  withPropsOnChange,
  withState
} from '../../../utils/react'
import { actions as modalActions, selectModal } from '../../modules/modal'
import Modal from '../Modal'
import PropTypes from 'prop-types'
import React from 'react'
import Text from '../Text'
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
    overlayStyle: View.propTypes.style,
    style: View.propTypes.style
  }),
  defaultProps({
    disabled: false,
    onHide: noop,
    onShow: noop,
    styles: {
      ...Styles,
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
    const modal = selectModal(name, state)
    return {
      visible: getProp('visible', modal)
    }
  }),
  withState('modalVisible', 'setModalVisible', false),
  withPropsOnChange(
    ['visible'],
    ({ name, onHide, setModalCancelEnabled, setModalVisible, visible }) => {
      if (visible) {
        setModalVisible(true)
      } else {
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
    handleModalPress: ({ disabled, name, onRequestCancel, requestCancelModal }) => () => {
      if (disabled) {
        return
      }
      if (onRequestCancel) {
        onRequestCancel({ name })
      } else {
        requestCancelModal(name)
      }
    },
    handleModalRequestClose: ({ name, onRequestCancel, requestCancelModal }) => () => {
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
        <Text onPress={handleModalPress} style={[styles.overlay, overlayStyle]} />
        {children}
      </View>
    </Modal>
  )
)

export default CancelableModal
