import PropTypes from 'prop-types'
import React from 'react'
import { Easing, StyleSheet } from 'react-native'

import { compose } from '../../../utils/lang'
import {
  connect,
  defaultProps,
  lifecycle,
  setDisplayName,
  setPropTypes,
  withHandlers,
  withPropsOnChange,
  withState
} from '../../../utils/react'
import { selectRouterAction, selectRouterLocation } from '../../modules/router'
import Animated from '../Animated'
import Switch from '../Switch'
import View from '../View'

const enhance = compose(
  setDisplayName('AnimatedSwitch'),
  setPropTypes({
    animationType: PropTypes.oneOf(['none', 'slide']),
    children: PropTypes.node.isRequired,
    location: PropTypes.object
  }),
  defaultProps({
    animationType: 'slide',
    styles: StyleSheet.create({
      from: {
        alignItems: 'center',
        position: 'absolute',
        top: 0
      },
      to: {
        alignItems: 'center'
      },
      wrapper: {
        overflow: 'hidden',
        width: '100%'
      }
    })
  }),
  connect((state) => ({
    routerAction: selectRouterAction(state),
    routerLocation: selectRouterLocation(state)
  })),
  withState('layoutWidth', 'setLayoutWidth', 0),
  withHandlers({
    handleLayout: ({ setLayoutWidth }) => ({ nativeEvent }) => {
      setLayoutWidth(nativeEvent.layout.width)
    }
  }),
  withState('previousRouterLocation', 'setPreviousRouterLocation'),
  // NOTE BRN: This overrides the routerLocation from state if it's been passed
  // in as a prop
  withPropsOnChange(
    ['location', 'routerLocation'],
    ({ location, routerLocation }) => ({
      routerLocation: location ? location : routerLocation
    })
  ),
  withPropsOnChange(
    ['previousRouterLocation', 'routerLocation'],
    ({ previousRouterLocation, routerLocation, setPreviousRouterLocation }) => {
      if (!previousRouterLocation) {
        setPreviousRouterLocation(routerLocation)
      } else if (routerLocation.pathname !== previousRouterLocation.pathname) {
        return { animating: true }
      }
      return { animating: false }
    }
  ),
  withPropsOnChange(
    ['animating'],
    ({ animating, layoutWidth, routerAction }) => {
      if (animating) {
        if (routerAction === 'PUSH') {
          return {
            fromTranslateX: new Animated.Value(0),
            toTranslateX: new Animated.Value(layoutWidth)
          }
        } else if (routerAction === 'POP') {
          return {
            fromTranslateX: new Animated.Value(0),
            toTranslateX: new Animated.Value(-layoutWidth)
          }
        }
      }
      return {
        fromTranslateX: 0,
        toTranslateX: 0
      }
    }
  ),
  withHandlers({
    animateRoutePop: ({
      fromTranslateX,
      layoutWidth,
      toTranslateX
    }) => async () =>
      Promise.all([
        new Promise((resolve) =>
          Animated.timing(fromTranslateX, {
            duration: 250,
            easing: Easing.out(Easing.ease),
            toValue: layoutWidth
          }).start(resolve)
        ),
        new Promise((resolve) =>
          Animated.timing(toTranslateX, {
            duration: 250,
            easing: Easing.in(Easing.ease),
            toValue: 0
          }).start(resolve)
        )
      ]),
    animateRoutePush: ({
      fromTranslateX,
      layoutWidth,
      toTranslateX
    }) => async () =>
      Promise.all([
        new Promise((resolve) =>
          Animated.timing(fromTranslateX, {
            duration: 250,
            easing: Easing.out(Easing.ease),
            toValue: -layoutWidth
          }).start(resolve)
        ),
        new Promise((resolve) =>
          Animated.timing(toTranslateX, {
            duration: 250,
            easing: Easing.in(Easing.ease),
            toValue: 0
          }).start(resolve)
        )
      ])
  }),
  withHandlers({
    handleAnimate: ({
      animateRoutePop,
      animateRoutePush,
      routerAction,
      routerLocation,
      setPreviousRouterLocation
    }) => () => {
      if (routerAction === 'POP') {
        return animateRoutePop().then(() => {
          setPreviousRouterLocation(routerLocation)
        })
      } else if (routerAction === 'PUSH') {
        return animateRoutePush().then(() => {
          setPreviousRouterLocation(routerLocation)
        })
      }
      setPreviousRouterLocation(routerLocation)
    }
  }),
  // NOTE BRN: Use previousLocation instead and render two Switches (one with
  // current location and one with previous)
  // withState('previousChildren', 'setPreviousChildren', null),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (this.props.animating && !prevProps.animating) {
        this.props.handleAnimate()
      }
    }
  })
)

const AnimatedSwitch = enhance(
  ({
    animating,
    children,
    fromTranslateX,
    handleLayout,
    previousRouterLocation,
    routerLocation,
    styles,
    toTranslateX
  }) => {
    return (
      <View onLayout={handleLayout} style={styles.wrapper}>
        {animating ? (
          <Animated.View
            style={[
              styles.from,
              { transform: [{ translateX: fromTranslateX }] }
            ]}
          >
            <Switch location={previousRouterLocation}>{children}</Switch>
          </Animated.View>
        ) : null}
        <Animated.View
          style={[styles.to, { transform: [{ translateX: toTranslateX }] }]}
        >
          <Switch location={routerLocation}>{children}</Switch>
        </Animated.View>
      </View>
    )
  }
)

export default AnimatedSwitch
