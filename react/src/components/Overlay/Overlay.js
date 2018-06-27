import { is, noop } from 'moltres-utils'
import PropTypes from 'prop-types'
import React from 'react'
import { Button, Modal, StyleSheet, View } from 'react-native'
import { compose, defaultProps, setPropTypes, withHandlers, withStateHandlers } from 'recompose'

const enhance = compose(
  setPropTypes({
    onDismiss: PropTypes.func
  }),
  defaultProps({
    styles: StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center'
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey'
      },
      innerContainer: {
        alignItems: 'center'
      }
    }),
    onDismiss: noop,
    startOpen: false
  }),
  withStateHandlers(
    ({ startOpen }) => ({
      modalVisible: startOpen
    }),
    {
      closeModal: () => () => ({
        modalVisible: false
      }),
      openModal: () => () => ({
        modalVisible: true
      }),
      toggleModal: ({ modalVisible }) => () => ({
        modalVisible: !modalVisible
      })
    }
  ),
  withHandlers({
    handleRequestClose: ({ closeModal }) => () => {
      closeModal()
    },
    handleDismiss: ({ onDismiss }) => () => {
      if (is(Function, onDismiss)) {
        onDismiss()
      }
    }
  })
)

export default enhance(({ children, handleDismiss, handleRequestClose, modalVisible, styles }) => (
  <View style={styles.container}>
    <Modal
      visible={modalVisible}
      animationType={'slide'}
      onRequestClose={handleRequestClose}
      onDismiss={handleDismiss}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <Button onPress={handleRequestClose} title="X">
            {'X'}
          </Button>
          {children}
        </View>
      </View>
    </Modal>
  </View>
))
