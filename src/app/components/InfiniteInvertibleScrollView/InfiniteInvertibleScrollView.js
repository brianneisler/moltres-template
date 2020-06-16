// import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
// import { compose, defaultProps, setPropTypes, withHandlers, withState } from 'recompose'
// import { filter } from '../../utils/data'
// import LoadingError from '../LoadingError'
// import PropTypes from 'prop-types'
// import React from 'react'
// import ScrollableMixin from '../ScrollableMixin'
// import cloneReferencedElement from 'react-clone-referenced-element'

// const distanceFromEnd = ({ horizontal }, event) => {
//   const { contentSize, contentInset, contentOffset, layoutMeasurement } = event.nativeEvent

//   let contentLength = contentSize.height
//   let trailingInset = contentInset.bottom
//   let scrollOffset = contentOffset.y
//   let viewportLength = layoutMeasurement.height
//   if (horizontal) {
//     contentLength = contentSize.width
//     trailingInset = contentInset.right
//     scrollOffset = contentOffset.x
//     viewportLength = layoutMeasurement.width
//   }

//   return contentLength + trailingInset - scrollOffset - viewportLength
// }

// const renderInvertedChildren = (children, inversionStyle) =>
//   React.Children.map(children, (child) => {
//     return child ? <View style={inversionStyle}>{child}</View> : child
//   })

// const enhance = compose(
//   setPropTypes({
//     ...ScrollView.propTypes,
//     canLoadMore: PropTypes.bool.isRequired,
//     distanceToLoadMore: PropTypes.number.isRequired,
//     inverted: PropTypes.bool,
//     onLoadError: PropTypes.func,
//     onLoadMore: PropTypes.func.isRequired,
//     renderLoadingErrorIndicator: PropTypes.func,
//     renderLoadingIndicator: PropTypes.func,
//     renderScrollComponent: PropTypes.func,
//     stickyFooterIndices: PropTypes.array
//   }),
//   defaultProps({
//     canLoadMore: false,
//     distanceToLoadMore: 500,
//     renderLoadingErrorIndicator: ({ error }) => <LoadingError message={error.message} />,
//     renderLoadingIndicator: () => <ActivityIndicator />,
//     renderScrollComponent: (props) => <ScrollView {...props} />,
//     scrollEventThrottle: 1,
//     stickyFooterIndices: [],
//     styles: StyleSheet.create({
//       horizontallyInverted: {
//         transform: [{ scaleX: -1 }]
//       },
//       verticallyInverted: {
//         transform: [{ scaleY: -1 }]
//       }
//     })
//   }),
//   withState('error', 'setError', false),
//   withState('isLoading', 'setIsLoading', false),
//   withHandlers({
//     loadMore: ({ onLoadError, onLoadMore, setError, setIsLoading }) => async () => {
//       try {
//         await Promise.all([
//           new Promise((resolve) => {
//             setError(null, resolve)
//           }),
//           new Promise((resolve) => {
//             setIsLoading(true, resolve)
//           })
//         ])

//         await onLoadMore()
//         await new Promise((resolve) => {
//           setIsLoading(false, resolve)
//         })
//       } catch (error) {
//         if (onLoadError) {
//           onLoadError(error)
//         }
//         await Promise.all([
//           new Promise((resolve) => {
//             setError(error, resolve)
//           }),
//           new Promise((resolve) => {
//             setIsLoading(false, resolve)
//           })
//         ])
//       }
//     }
//   }),
//   withHandlers({
//     handleScroll: ({
//       canLoadMore,
//       distanceToLoadMore,
//       error,
//       horizontal,
//       isLoading,
//       loadMoreAsync,
//       onScroll
//     }) => (event) => {
//       onScroll(event)
//       if (isLoading || !canLoadMore || error) {
//         return
//       }

//       if (distanceFromEnd({ horizontal }, event) < distanceToLoadMore) {
//         loadMoreAsync()
//       }
//     }
//   })
// )

// class InfiniteInvertibleScrollView extends React.Component {
//   getScrollResponder() {
//     return this._scrollComponent.getScrollResponder()
//   }

//   setNativeProps(nativeProps) {
//     this._scrollComponent.setNativeProps(nativeProps)
//   }

//   render() {
//     let statusIndicator

//     if (this.props.isDisplayingError) {
//       statusIndicator = React.cloneElement(
//         this.props.renderLoadingErrorIndicator({
//           error: this.props.error,
//           onRetryLoadMore: this.props.onLoadMore
//         }),
//         { key: 'loading-error-indicator' }
//       )
//     } else if (this.props.canLoadMore) {
//       statusIndicator = React.cloneElement(this.props.renderLoadingIndicator(), {
//         key: 'loading-indicator'
//       })
//     }

//     const { inverted, renderScrollComponent, styles, ...props } = this.props
//     const scrollProps = {
//       ...props,
//       children: [this.props.children, statusIndicator],
//       onScroll: this.props.handleScroll,
//       stickyFooterIndices: filter(
//         this.props.stickyFooterIndices,
//         (val) => val < this.props.children[1].length
//       )
//     }

//     if (inverted) {
//       if (this.props.horizontal) {
//         props.style = [styles.horizontallyInverted, props.style]
//         props.children = renderInvertedChildren(props.children, styles.horizontallyInverted)
//       } else {
//         props.style = [styles.verticallyInverted, props.style]
//         props.children = renderInvertedChildren(props.children, styles.verticallyInverted)
//       }
//     }

//     return renderScrollComponent(scrollProps)
//     , {
//       // ref: (component) => {
//       //   this._scrollComponent = component
//       // }
//     })
//   }
// }

// Object.assign(InfiniteInvertibleScrollView.prototype, ScrollableMixin)

// export default enhance(InfiniteInvertibleScrollView)

import { StyleSheet } from 'react-native'
import { assign, filter, noop } from '../../../utils/data'
import { cloneReferencedElement } from '../../../utils/react'
import ActivityIndicator from '../ActivityIndicator'
import LoadingError from '../LoadingError'
import PropTypes from 'prop-types'
import React from 'react'
import ScrollView from '../ScrollView'
import ScrollableMixin from '../ScrollableMixin'
import View from '../View'

const styles = StyleSheet.create({
  horizontallyInverted: {
    transform: [{ scaleX: -1 }]
  },
  verticallyInverted: {
    transform: [{ scaleY: -1 }]
  }
})

class InfiniteInvertibleScrollView extends React.Component {
  static propTypes = {
    ...ScrollView.propTypes,
    canLoadMore: PropTypes.bool,
    distanceToLoadMore: PropTypes.number,
    inverted: PropTypes.bool,
    onLoadError: PropTypes.func,
    onLoadMore: PropTypes.func,
    renderLoadingErrorIndicator: PropTypes.func.isRequired,
    renderLoadingIndicator: PropTypes.func.isRequired,
    renderScrollComponent: PropTypes.func.isRequired,
    stickyFooterIndices: PropTypes.array
  }

  static defaultProps = {
    canLoadMore: false,
    distanceToLoadMore: 4000,
    onLoadError: noop,
    onLoadMore: noop,
    renderLoadingErrorIndicator: ({ error }) => (
      <LoadingError message={error.message} />
    ),
    renderLoadingIndicator: () => <ActivityIndicator />,
    renderScrollComponent: (props) => <ScrollView {...props} />,
    scrollEventThrottle: 1,
    stickyFooterIndices: []
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      isDisplayingError: false
    }

    this._handleScroll = this._handleScroll.bind(this)
    this._onLoadMore = this._onLoadMore.bind(this)
    this.originalOnScroll = null
  }

  getScrollResponder() {
    return this._scrollComponent.getScrollResponder()
  }

  setNativeProps(nativeProps) {
    this._scrollComponent.setNativeProps(nativeProps)
  }

  render() {
    let statusIndicator
    const { isDisplayingError } = this.state
    const {
      canLoadMore,
      children,
      horizontal,
      onScroll,
      renderLoadingErrorIndicator,
      renderLoadingIndicator,
      stickyFooterIndices
    } = this.props
    if (isDisplayingError) {
      statusIndicator = React.cloneElement(
        renderLoadingErrorIndicator({ onRetryLoadMore: this._onLoadMore }),
        { key: 'loading-error-indicator' }
      )
    } else if (canLoadMore) {
      statusIndicator = React.cloneElement(renderLoadingIndicator(), {
        key: 'loading-indicator'
      })
    }

    const { inverted, renderScrollComponent, ...props } = this.props
    this.originalOnScroll = onScroll
    assign(props, {
      children: [children, statusIndicator],
      onScroll: this._handleScroll,
      stickyFooterIndices: filter(
        (val) => val < children[1].length,
        stickyFooterIndices
      )
    })

    if (inverted) {
      if (horizontal) {
        props.contentContainerStyle = [
          styles.horizontallyInverted,
          props.contentContainerStyle
        ]
        props.children = this._renderInvertedChildren(
          props.children,
          styles.horizontallyInverted
        )
      } else {
        props.contentContainerStyle = [
          styles.verticallyInverted,
          props.contentContainerStyle
        ]
        props.children = this._renderInvertedChildren(
          props.children,
          styles.verticallyInverted
        )
      }
    }

    return cloneReferencedElement(renderScrollComponent(props), {
      ref: (component) => {
        this._scrollComponent = component
      }
    })
  }

  _renderInvertedChildren(children, inversionStyle) {
    return React.Children.map(children, (child) => {
      return child ? <View style={inversionStyle}>{child}</View> : child
    })
  }

  _handleScroll() {
    // if (this.originalOnScroll) {
    //   this.originalOnScroll(event)
    // }
    // if (this.isLoading || !this.props.canLoadMore || this.state.isDisplayingError) {
    //   return
    // }
    // if (this._distanceFromEnd(event) < this.props.distanceToLoadMore) {
    //   this._onLoadMore()
    // }
  }

  _onLoadMore() {
    const { onLoadError, onLoadMore } = this.props
    try {
      this.setState({ isDisplayingError: false })
      this.isLoading = true
      onLoadMore().then(() => {
        this.isLoading = false
      })
    } catch (error) {
      if (onLoadError) {
        onLoadError(error)
      }
      this.setState({ isDisplayingError: true })
      this.isLoading = false
    }
  }

  _distanceFromEnd(event) {
    const { horizontal } = this.props
    const {
      contentInset,
      contentOffset,
      contentSize,
      layoutMeasurement
    } = event.nativeEvent
    let contentLength = contentSize.height
    let trailingInset = contentInset.bottom
    let scrollOffset = contentOffset.y
    let viewportLength = layoutMeasurement.height
    if (horizontal) {
      contentLength = contentSize.width
      trailingInset = contentInset.right
      scrollOffset = contentOffset.x
      viewportLength = layoutMeasurement.width
    }

    return contentLength + trailingInset - scrollOffset - viewportLength
  }
}

assign(InfiniteInvertibleScrollView.prototype, ScrollableMixin)

export default InfiniteInvertibleScrollView
