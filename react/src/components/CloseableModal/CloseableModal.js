import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { compose, defaultProps, setPropTypes } from 'recompose'
import Emoji from '../Emoji'
import { Colors } from '../../styles'

const enhance = compose(
  setPropTypes({
    ...Modal.propTypes
  }),
  defaultProps({
    ...Modal.defaultProps,
    styles: StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center'
      },
      content: {
        paddingBottom: 40,
        paddingLeft: 40,
        paddingRight: 40
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center'
      },
      innerContainer: {
        alignItems: 'center'
      },
      modal: {
        backgroundColor: Colors.whitePrimary
      },
      modalTransparent: {
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2
      },
      closeButton: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.whitePrimary,
        color: Colors.blackSecondary,
        fontSize: 20,
        padding: 5
      }
    })
  })
)

export default enhance(({ children, onRequestClose, styles, transparent, ...rest }) => {
  let modalStyle = [styles.modal]
  if (transparent) {
    modalStyle = [...modalStyle, styles.modalTransparent]
  }
  return (
    <View style={styles.container}>
      <Modal onRequestClose={onRequestClose} transparent={transparent} {...rest}>
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <View style={modalStyle}>
              <Emoji name="x" onPress={onRequestClose} style={styles.closeButton} />
              <View style={styles.content}>{children}</View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
})
