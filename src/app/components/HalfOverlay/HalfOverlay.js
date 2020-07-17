import PropTypes from 'prop-types'
import React from 'react'
import { Easing, StyleSheet } from 'react-native'

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
import { selectDimensionsWindowHeight } from '../../modules/dimensions'
import { actions as modalActions } from '../../modules/modal'
import { Colors, Constants, Styles } from '../../styles'
import Animated from '../Animated'
import CancelableModal from '../CancelableModal'
import ScrollView from '../ScrollView'

const enhance = compose(
  setDisplayName('HalfOverlay'),
  setPropTypes({
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    onPreShow: PropTypes.func,
    onShow: PropTypes.func,
    styleBody: styleShape,
    styleOverlayContainer: styleShape,
    styleOverlayContentContainer: styleShape
  }),
  defaultProps({
    onPreShow: noop,
    onShow: noop,
    styles: {
      ...Styles,
      ...StyleSheet.create({
        body: {
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%'
        },
        buttonBox: {
          alignItems: 'center',
          backgroundColor: Colors.whitePrimary,
          height: 50,
          justifyContent: 'center',
          marginTop: Constants.hairlineWidth
        },
        halfModal: {
          justifyContent: 'flex-end'
        },
        wrapper: {
          flex: 1,
          flexDirection: 'row'
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
    height: Math.round(windowHeight * 0.7)
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
    handleModalHide: ({ hideSheet }) => async () => hideSheet(),
    handleModalRequestCancel: ({ requestCancelModal }) => ({ name }) => {
      requestCancelModal(name)
    },
    handleModalShow: ({ onPreShow, onShow, showSheet }) => async () => {
      onPreShow()
      await showSheet()
      onShow()
    }
  })
)

const HalfOverlay = enhance(
  ({
    children,
    handleModalHide,
    handleModalRequestCancel,
    handleModalShow,
    height,
    name,
    onCancel,
    scrollEnabled,
    styleBody,
    styleOverlayContainer,
    styleOverlayContentContainer,
    styles,
    translateY
  }) => {
    return (
      <CancelableModal
        animationType="none"
        name={name}
        onCancel={onCancel}
        onHide={handleModalHide}
        onRequestCancel={handleModalRequestCancel}
        onShow={handleModalShow}
        style={[styles.modal, styles.halfModal]}
      >
        <Animated.View
          style={[
            styles.body,
            styleBody,
            { height, transform: [{ translateY }] }
          ]}
        >
          <ScrollView
            contentContainerStyle={styleOverlayContentContainer}
            scrollEnabled={scrollEnabled}
            style={styleOverlayContainer}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </CancelableModal>
    )
  }
)

export default HalfOverlay
