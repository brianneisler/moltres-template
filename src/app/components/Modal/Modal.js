import { Colors } from '../../styles'
import { Dimensions, Easing, StyleSheet } from 'react-native'
import { compose, isFunction, noop } from '../../../utils/data'
import {
  defaultProps,
  lifecycle,
  setDisplayName,
  setPropTypes,
  withHandlers,
  withState
} from '../../../utils/react'
import Animated from '../Animated'
import Portal from './Portal'
import PropTypes from 'prop-types'
import React from 'react'

const enhance = compose(
  setDisplayName('Modal'),
  setPropTypes({
    animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
    children: PropTypes.node.isRequired,
    onDismiss: PropTypes.func,
    onRequestClose: PropTypes.func, // Only used on Android/Apple TV
    onShow: PropTypes.func,
    transparent: PropTypes.bool,
    visible: PropTypes.bool
  }),
  defaultProps({
    animationType: 'none',
    onDismiss: noop,
    onRequestClose: noop,
    onShow: noop,
    opacityFade: new Animated.Value(0),
    slideTranslation: new Animated.Value(0),
    styles: StyleSheet.create({
      baseStyle: {
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 9999
      },
      bgNotTransparent: {
        backgroundColor: '#ffffff'
      },
      bgTransparent: {
        backgroundColor: 'transparent'
      },
      disabled: {
        color: Colors.primaryBlack,
        opacity: 0.3
      },
      hidden: {
        display: 'none'
      },
      visible: {
        display: 'flex'
      }
    }),
    transparent: false,
    visible: false
  }),
  withState('styleDisplay', 'setStyleDisplay', ({ visible }) => (visible ? 'flex' : 'none')),
  withState('animationSlide', 'setAnimationSlide', null),
  withState('animationFade', 'setAnimationFade', null),
  withHandlers({
    animateFadeIn: ({ animationFade, opacityFade, setAnimationFade, setStyleDisplay }) => (
      callback
    ) => {
      if (animationFade) {
        animationFade.stop()
      }

      animationFade = Animated.timing(opacityFade, {
        duration: 300,
        toValue: 1
      })

      setAnimationFade(animationFade, () => {
        requestAnimationFrame(() => {
          setStyleDisplay('flex', () => animationFade.start(callback))
        })
      })
    },
    animateFadeOut: ({ animationFade, opacityFade, setAnimationFade, setStyleDisplay }) => (
      callback
    ) => {
      if (animationFade) {
        animationFade.stop()
      }

      animationFade = Animated.timing(opacityFade, {
        duration: 300,
        toValue: 0
      })

      setAnimationFade(animationFade, () => {
        requestAnimationFrame(() => {
          animationFade.start(() => {
            setStyleDisplay('none', callback)
          })
        })
      })
    },
    animateSlideIn: ({ animationSlide, setAnimationSlide, setStyleDisplay, slideTranslation }) => (
      callback
    ) => {
      if (animationSlide) {
        animationSlide.stop()
      }
      animationSlide = Animated.timing(slideTranslation, {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        toValue: 1
      })
      setAnimationSlide(animationSlide, () => {
        requestAnimationFrame(() => {
          setStyleDisplay('flex', () => animationSlide.start(callback))
        })
      })
    },

    animateSlideOut: ({ animationSlide, setAnimationSlide, setStyleDisplay, slideTranslation }) => (
      callback
    ) => {
      if (animationSlide) {
        animationSlide.stop()
      }
      animationSlide = Animated.timing(slideTranslation, {
        duration: 300,
        easing: Easing.in(Easing.poly(4)),
        toValue: 0
      })
      setAnimationSlide(animationSlide, () => {
        requestAnimationFrame(() => {
          animationSlide.start(() => setStyleDisplay('none', callback))
        })
      })
    }
  }),
  withHandlers({
    handleClose: ({ animateFadeOut, animateSlideOut, animationType, onDismiss }) => () => {
      if (animationType === 'slide') {
        animateSlideOut(onDismiss)
      } else if (animationType === 'fade') {
        animateFadeOut(onDismiss)
      } else {
        onDismiss()
      }
    },
    handleDismiss: ({ onDismiss }) => () => {
      if (isFunction(onDismiss)) {
        onDismiss()
      }
    },
    handleRequestClose: ({ onRequestClose }) => () => {
      onRequestClose()
    },
    handleShow: ({ animateFadeIn, animateSlideIn, animationType, onShow }) => () => {
      if (animationType === 'slide') {
        animateSlideIn(onShow)
      } else if (animationType === 'fade') {
        animateFadeIn(onShow)
      } else {
        onShow()
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      if (this.props.visible) {
        this.props.handleShow()
      }
    },
    componentDidUpdate(prevProps) {
      if (this.props.visible && !prevProps.visible) {
        this.props.handleShow()
      }
      if (!this.props.visible && prevProps.visible) {
        this.props.handleClose()
      }
    }
  })
)

const getAnimationStyles = ({
  animationType,
  opacityFade,
  slideTranslation,
  styleDisplay,
  styles,
  visible
}) => {
  if (animationType === 'slide') {
    return {
      display: styleDisplay,
      transform: [
        {
          translateY: slideTranslation.interpolate({
            extrapolate: 'clamp',
            inputRange: [0, 1],
            outputRange: [Dimensions.get('window').height, 0]
          })
        }
      ]
    }
  }
  if (animationType === 'fade') {
    return { display: styleDisplay, opacity: opacityFade }
  }

  return styles[visible ? 'visible' : 'hidden']
}

const Modal = enhance((props) => {
  const { children, styles, transparent } = props
  const transparentStyle = transparent ? styles.bgTransparent : styles.bgNotTransparent
  const animationStyles = getAnimationStyles(props)
  return (
    <Portal>
      <Animated.View style={[styles.baseStyle, transparentStyle, animationStyles]}>
        {children}
      </Animated.View>
    </Portal>
  )
})

export default Modal
