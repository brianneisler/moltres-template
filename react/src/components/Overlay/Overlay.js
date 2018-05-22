import PropTypes from 'prop-types'
import { is } from 'ramda'
import React from 'react'
import { Button, Modal, StyleSheet, View } from 'react-native'
import {
  compose,
  defaultProps,
  setPropTypes,
  withHandlers,
  withStateHandlers
} from 'recompose'
import { noop } from '../../util'


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
      console.log('handleRequestClose')
      closeModal()
    },
    handleDismiss: ({ onDismiss }) => () => {
      console.log('handleDismiss Overlay')
      if (is(Function, onDismiss)) {
        console.log('has onDismiss')
        onDismiss()
      }
    }
  })
)

export default enhance(({ children, handleDismiss, handleRequestClose, modalVisible, styles }) => {
  console.log('modalVisible:', modalVisible, ' handleDismiss:', handleDismiss)
  return <View style={styles.container}>
    <Modal
      visible={modalVisible}
      animationType={'slide'}
      onRequestClose={handleRequestClose}
      onDismiss={handleDismiss}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <Button
            onPress={handleRequestClose}
            title="X"
          >
            {'X'}
          </Button>
          {children}
        </View>
      </View>
    </Modal>
  </View>
})
