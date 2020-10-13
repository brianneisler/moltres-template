import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'

import { ALERT } from '../../../constants/Modal'
import { compose, getProperty, map } from '../../../utils/lang'
import {
  defaultProps,
  memo,
  setDisplayName,
  setPropTypes,
  withActions,
  withHandlers
} from '../../../utils/react'
import { actions as modalActions } from '../../modules/modal'
import { Colors, StyleSheets, Styles } from '../../styles'
import Button from '../Button'
import CancelableModal from '../CancelableModal'
import CloseButton from '../CloseButton'
import ScrollView from '../ScrollView'
import Text from '../Text'
import View from '../View'

const AlertTitle = ({ styles, title }) => {
  if (!title) {
    return null
  }
  return React.isValidElement(title) ? (
    title
  ) : (
    <Text style={styles.title}>{title}</Text>
  )
}

const AlertMessage = ({ message, styles }) => {
  if (!message) {
    return null
  }
  return React.isValidElement(message) ? (
    message
  ) : (
    <Text style={styles.message}>{message}</Text>
  )
}

const renderButtons = ({ buttons, styles }) => {
  let flexDirectionStyle = styles.buttonsInRow
  if (buttons.length > 2) {
    flexDirectionStyle = styles.buttonsInColumn
  }

  return (
    <View style={[styles.buttonsContainer, flexDirectionStyle]}>
      {map(
        (button, index) => (
          <Button
            key={`AlertButton-${index}`}
            onPress={button.onPress}
            style={[styles.button, button.style]}
            text={button.text}
            type={button.type}
          />
        ),
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
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  }),
  defaultProps({
    options: {
      cancelable: true
    },
    styles: {
      ...StyleSheets,
      ...StyleSheet.create({
        alertBlock: {
          backgroundColor: Colors.whitePrimary,
          borderRadius: 16,
          maxWidth: 640,
          minWidth: 480,
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
        button: {
          height: 40,
          marginLeft: 20,
          marginRight: 20,
          width: 80
        },
        buttonsContainer: {
          backgroundColor: Colors.whitePrimary,
          justifyContent: 'center',
          marginBottom: 32,
          marginTop: 32
        },
        buttonsInColumn: {
          flexDirection: 'column'
        },
        buttonsInRow: {
          flexDirection: 'row'
        },
        closeButton: {
          zIndex: 1000
        },
        innerContainer: {
          alignItems: 'center',
          backgroundColor: Colors.whitePrimary,
          borderRadius: 16,
          flexDirection: 'column',
          maxWidth: 640,
          minWidth: 480,
          overflow: 'hidden',
          width: '100%'
        },
        message: {
          ...Styles.textMedium,
          color: Colors.blue10,
          fontSize: 18,
          marginLeft: 16,
          marginRight: 16,
          marginTop: 16,
          textAlign: 'center'
        },
        modal: {
          justifyContent: 'center'
        },
        overlayContainer: {
          flexGrow: 0,
          flexShrink: 0,
          maxHeight: '100%',
          maxWidth: 640,
          width: '100%'
        },
        overlayContentContainer: {
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginTop: 40,
          width: '100%'
        },
        title: {
          ...Styles.header2,
          color: Colors.blue10,
          fontWeight: 600,
          marginLeft: 16,
          marginRight: 16,
          marginTop: 56
        }
      })
    }
  }),
  withActions({
    requestCancelModal: modalActions.requestCancelModal
  }),
  withHandlers({
    handleModalRequestCancel: ({ options, requestCancelModal }) => ({
      name
    }) => {
      if (getProperty('cancelable', options)) {
        requestCancelModal(name)
      }
    }
  }),
  withHandlers({
    handleCloseButtonPress: ({ handleModalRequestCancel }) => () => {
      handleModalRequestCancel({ name: ALERT })
    }
  }),
  memo
)

const Alert = enhance((props) => {
  const {
    handleCloseButtonPress,
    handleModalRequestCancel,
    options,
    styles
  } = props
  return (
    <CancelableModal
      animationType="fade"
      name={ALERT}
      onRequestCancel={handleModalRequestCancel}
      style={styles.modal}
    >
      <ScrollView
        contentContainerStyle={[
          styles.overlayContentContainer,
          options.overlayContentContainerStyle
        ]}
        style={styles.overlayContainer}
      >
        <View style={[styles.innerContainer, options.innerContainerStyle]}>
          {options.cancelable ? (
            <CloseButton
              buttonStyle={styles.closeButton}
              onPress={handleCloseButtonPress}
            />
          ) : null}
          <AlertTitle {...props} />
          <AlertMessage {...props} />
          {renderButtons(props)}
        </View>
      </ScrollView>
    </CancelableModal>
  )
})

export default Alert
