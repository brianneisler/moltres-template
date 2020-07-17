import { Colors, Fonts } from '../../styles'
import { compose } from '../../../utils/lang'
import {
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape,
  withActions,
  withHandlers
} from '../../../utils/react'
import { actions as modalActions } from '../../modules/modal'
import CancelableModal from '../CancelableModal'
import PropTypes from 'prop-types'
import React from 'react'
import ScrollView from '../ScrollView'
import Text from '../Text'
import TouchableOpacity from '../TouchableOpacity'
import View from '../View'

const enhance = compose(
  setDisplayName('Overlay'),
  setPropTypes({
    animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
    cancelText: PropTypes.string,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    overlayStyle: styleShape,
    submitText: PropTypes.string,
    title: PropTypes.string
  }),
  defaultProps({
    styles: {
      cancelText: {
        color: Colors.redPrimary,
        fontFamily: Fonts.primaryFontFamily
      },
      header: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        width: '100%'
      },
      headerCenter: {
        alignItems: 'center',
        flex: 1,
        height: 50,
        justifyContent: 'center',
        paddingTop: 0
      },
      headerLeft: {
        alignItems: 'center',
        width: 50
      },
      headerRight: {
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        width: 50
      },
      innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth: 600,
        padding: 15
      },
      overlay: {
        backgroundColor: Colors.backgroundPrimary,
        opacity: 1
      },
      overlayContainer: {
        flex: 1,
        width: '100%'
      },
      overlayContentContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
      },
      submitText: {
        color: Colors.bluePrimary,
        fontFamily: Fonts.primaryFontFamily,
        fontWeight: 'bold'
      },
      titleText: {
        color: Colors.blackPrimary,
        fontFamily: Fonts.primaryFontFamily,
        fontWeight: 'bold'
      }
    }
  }),
  withActions({
    hideModal: modalActions.hideModal,
    requestCancelModal: modalActions.requestCancelModal
  }),
  withHandlers({
    handleCancelPress: ({ name, requestCancelModal }) => () =>
      requestCancelModal(name),
    handleSubmitPress: ({ hideModal, name, onSubmit }) => () => {
      if (onSubmit) {
        onSubmit({ name })
      } else {
        hideModal(name)
      }
    }
  })
)

const Overlay = enhance((props) => {
  const {
    cancelText,
    children,
    disabled,
    handleCancelPress,
    handleSubmitPress,
    name,
    overlayStyle,
    styles,
    submitText,
    title
  } = props
  return (
    <CancelableModal
      animationType={props.animationType}
      disabled={true}
      name={name}
      onCancel={props.onCancel}
      overlayStyle={styles.overlay}
    >
      <ScrollView
        contentContainerStyle={styles.overlayContentContainer}
        style={styles.overlayContainer}
      >
        <View
          style={[
            styles.innerContainer,
            overlayStyle,
            disabled ? styles.disabled : styles.enabled
          ]}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {cancelText ? (
                <TouchableOpacity
                  disabled={disabled}
                  onPress={handleCancelPress}
                >
                  <Text style={styles.cancelText}>{cancelText}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.headerCenter}>
              {title ? <Text style={styles.titleText}>{title}</Text> : null}
            </View>
            <View style={styles.headerRight}>
              {submitText ? (
                <TouchableOpacity
                  disabled={disabled}
                  onPress={handleSubmitPress}
                >
                  <Text style={styles.submitText}>{submitText}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          {children}
        </View>
      </ScrollView>
    </CancelableModal>
  )
})

export default Overlay
