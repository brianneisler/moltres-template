import { Colors, Styles } from '../../styles'
import { StyleSheet } from 'react-native'
import { compose, noop } from '../../../utils/data'
import {
  defaultProps,
  setDisplayName,
  setPropTypes,
  withHandlers,
  withPropsOnChange,
  withState
} from '../../../utils/react'
import ActivityIndicator from '../ActivityIndicator'
import Image from '../Image'
import PropTypes from 'prop-types'
import React from 'react'
import Text from '../Text'
import View from '../View'

const enhance = compose(
  setDisplayName('ImageView'),
  setPropTypes({
    accessibilityLabel: PropTypes.string,
    imageHeight: PropTypes.number,
    imageWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    onLoad: PropTypes.func,
    source: PropTypes.object,
    style: View.propTypes.style,
    uri: PropTypes.string
  }),
  defaultProps({
    imageHeight: 0,
    imageWidth: 0,
    onLoad: noop,
    styles: {
      ...Styles,
      ...StyleSheet.create({
        image: {
          flex: 1
        },
        imageContainer: {
          alignItems: 'center',
          backgroundColor: Colors.whitePrimary,
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }
      })
    }
  }),
  withState('layoutWidth', 'setLayoutWidth', ({ imageWidth, maxWidth }) => {
    if (maxWidth) {
      if (imageWidth) {
        return Math.min(maxWidth, imageWidth)
      }
      return maxWidth
    }
    return imageWidth
  }),
  withState('error', 'setError'),
  withState('isLoading', 'setIsLoading', true),
  withHandlers({
    handleLayout: ({ setLayoutWidth }) => ({ nativeEvent }) => {
      // {nativeEvent: {layout: {x, y, width, height}}}.
      setLayoutWidth(nativeEvent.layout.width)
    },
    handleLoad: ({ onLoad }) => (event) => {
      onLoad(event)
    },
    handleLoadEnd: ({ setIsLoading }) => () => {
      setIsLoading(false)
    },
    handleLoadError: ({ setError }) => ({ nativeEvent }) => {
      setError(nativeEvent.error)
    },
    handleLoadStart: ({ setIsLoading }) => () => {
      setIsLoading(true)
    }
  }),
  withPropsOnChange(['source', 'uri'], ({ source, uri }) => {
    if (source) {
      return {
        source
      }
    }
    if (uri) {
      return {
        source: {
          uri
        }
      }
    }
  }),
  withPropsOnChange(
    ['imageHeight', 'imageWidth', 'layoutWidth'],
    ({ imageHeight, imageWidth, layoutWidth, maxHeight, maxWidth }) => {
      let height = imageHeight
      let width = imageWidth
      let imageRatio = 9 / 16
      if (imageWidth && imageHeight) {
        imageRatio = imageHeight / imageWidth
      }

      if (layoutWidth) {
        width = layoutWidth
      } else if (maxWidth && width > maxWidth) {
        width = maxWidth
      }
      height = Math.round(width * imageRatio)

      // NOTE BRN: we subtract 30 because the height of the indicator is 60
      let indicatorTop = Math.round(height / 2) - 30
      if (indicatorTop < 0) {
        indicatorTop = 0
      }
      return {
        activityIndicatorStyle: {
          position: 'absolute',
          top: indicatorTop
        },
        imageSizeStyle: {
          height,
          maxHeight,
          maxWidth,
          width
        }
      }
    }
  )
)

const ImageView = enhance(
  ({
    accessibilityLabel,
    activityIndicatorStyle,
    error,
    handleLayout,
    handleLoad,
    handleLoadEnd,
    handleLoadError,
    handleLoadStart,
    imageSizeStyle,
    isLoading,
    source,
    style,
    styles
  }) => {
    return (
      <View onLayout={handleLayout} style={[styles.imageContainer, style]}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Image
            accessibilityLabel={accessibilityLabel}
            defaultSource={source}
            onError={handleLoadError}
            onLoad={handleLoad}
            onLoadEnd={handleLoadEnd}
            onLoadStart={handleLoadStart}
            resizeMode="contain"
            source={source}
            style={[styles.image, imageSizeStyle]}
          />
        )}
        {isLoading ? (
          <ActivityIndicator
            style={[styles.activityIndicator, activityIndicatorStyle]}
          />
        ) : null}
      </View>
    )
  }
)

export default ImageView
