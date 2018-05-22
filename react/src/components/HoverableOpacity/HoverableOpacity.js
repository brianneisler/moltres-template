import React from 'react'
import { View } from 'react-native'
import {
  compose,
  setPropTypes,
  withHandlers,
  withState
} from 'recompose'

const enhance = compose(

)

const HoverableView = enhance(({
  accessible,
  accessibilityLabel,
  accessibilityComponentType,
  accessibilityTraits,
  children,
  style
}) =>
  <Animated.View
    accessible={accessible !== false}
    accessibilityLabel={accessibilityLabel}
    accessibilityComponentType={accessibilityComponentType}
    accessibilityTraits={accessibilityTraits}
    style={[ style, { opacity: this.state.anim }]}
    nativeID={this.props.nativeID}
    testID={this.props.testID}
    onLayout={this.props.onLayout}
    isTVSelectable={true}
    hasTVPreferredFocus={this.props.hasTVPreferredFocus}
    tvParallaxProperties={this.props.tvParallaxProperties}
    hitSlop={this.props.hitSlop}
    onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
    onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
    onResponderGrant={this.touchableHandleResponderGrant}
    onResponderMove={this.touchableHandleResponderMove}
    onResponderRelease={this.touchableHandleResponderRelease}
    onResponderTerminate={this.touchableHandleResponderTerminate}>
    {children}
  </Animated.View>
)

class HoverableOpacity extends React.Component {
  setStyles = (styles) => {
    this.root.setNativeProps({
      style: styles,
    })
  }

  render() {
    const { onHover, style, ...passThrough } = this.props
    return (
      <View
        ref={(component) => { this.root = component }}
        onMouseEnter={() => this.setStyles(onHover)}
        onMouseLeave={() => this.setStyles(style)}
        style={style}
        {...passThrough}
      />
    )
  }
}

export default HoverableView





var Animated = require('Animated');
var Easing = require('Easing');
var NativeMethodsMixin = require('NativeMethodsMixin');
var React = require('React');
var PropTypes = require('prop-types');
var TimerMixin = require('react-timer-mixin');
var Touchable = require('Touchable');
var TouchableWithoutFeedback = require('TouchableWithoutFeedback');

var createReactClass = require('create-react-class');
var ensurePositiveDelayProps = require('ensurePositiveDelayProps');
var flattenStyle = require('flattenStyle');

type Event = Object;

var PRESS_RETENTION_OFFSET = {top: 20, left: 20, right: 20, bottom: 30};

var TouchableOpacity = createReactClass({
  displayName: 'TouchableOpacity',
  mixins: [TimerMixin, Touchable.Mixin, NativeMethodsMixin],

  propTypes: {
    ...TouchableWithoutFeedback.propTypes,
    /**
     * Determines what the opacity of the wrapped view should be when touch is
     * active. Defaults to 0.2.
     */
    activeOpacity: PropTypes.number,
    /**
     * *(Apple TV only)* TV preferred focus (see documentation for the View component).
     *
     * @platform ios
     */
    hasTVPreferredFocus: PropTypes.bool,
    /**
     * Apple TV parallax effects
     */
    tvParallaxProperties: PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      activeOpacity: 0.2,
    };
  },

  getInitialState: function() {
    return {
      ...this.touchableGetInitialState(),
      anim: new Animated.Value(this._getChildStyleOpacityWithDefault()),
    };
  },

  componentDidMount: function() {
    ensurePositiveDelayProps(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    ensurePositiveDelayProps(nextProps);
  },

  /**
   * Animate the touchable to a new opacity.
   */
  setOpacityTo: function(value: number, duration: number) {
    Animated.timing(
      this.state.anim,
      {
        toValue: value,
        duration: duration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }
    ).start();
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandleActivePressIn: function(e: Event) {
    if (e.dispatchConfig.registrationName === 'onResponderGrant') {
      this._opacityActive(0);
    } else {
      this._opacityActive(150);
    }
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut: function(e: Event) {
    this._opacityInactive(250);
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandlePress: function(e: Event) {
    this.props.onPress && this.props.onPress(e);
  },

  touchableHandleLongPress: function(e: Event) {
    this.props.onLongPress && this.props.onLongPress(e);
  },

  touchableGetPressRectOffset: function() {
    return this.props.pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },

  touchableGetHitSlop: function() {
    return this.props.hitSlop;
  },

  touchableGetHighlightDelayMS: function() {
    return this.props.delayPressIn || 0;
  },

  touchableGetLongPressDelayMS: function() {
    return this.props.delayLongPress === 0 ? 0 :
      this.props.delayLongPress || 500;
  },

  touchableGetPressOutDelayMS: function() {
    return this.props.delayPressOut;
  },

  _opacityActive: function(duration: number) {
    this.setOpacityTo(this.props.activeOpacity, duration);
  },

  _opacityInactive: function(duration: number) {
    this.setOpacityTo(
      this._getChildStyleOpacityWithDefault(),
      duration
    );
  },

  _getChildStyleOpacityWithDefault: function() {
   var childStyle = flattenStyle(this.props.style) || {};
   return childStyle.opacity == undefined ? 1 : childStyle.opacity;
 },

  render: function() {
    return (
      <Animated.View
        accessible={this.props.accessible !== false}
        accessibilityLabel={this.props.accessibilityLabel}
        accessibilityComponentType={this.props.accessibilityComponentType}
        accessibilityTraits={this.props.accessibilityTraits}
        style={[this.props.style, {opacity: this.state.anim}]}
        nativeID={this.props.nativeID}
        testID={this.props.testID}
        onLayout={this.props.onLayout}
        isTVSelectable={true}
        hasTVPreferredFocus={this.props.hasTVPreferredFocus}
        tvParallaxProperties={this.props.tvParallaxProperties}
        hitSlop={this.props.hitSlop}
        onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
        onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
        onResponderGrant={this.touchableHandleResponderGrant}
        onResponderMove={this.touchableHandleResponderMove}
        onResponderRelease={this.touchableHandleResponderRelease}
        onResponderTerminate={this.touchableHandleResponderTerminate}>
        {this.props.children}
        {Touchable.renderDebugView({color: 'cyan', hitSlop: this.props.hitSlop})}
      </Animated.View>
    );
  },
});

module.exports = TouchableOpacity;
