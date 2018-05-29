// import React from 'react'
// import { View } from 'react-native'
//
// class HoverableView extends React.Component {
//   setStyles = (styles) => {
//     this.root.setNativeProps({
//       style: styles,
//     })
//   }
//
//   render() {
//     const { onHover, style, ...passThrough } = this.props
//     return (
//       <View
//         ref={(component) => { this.root = component }}
//         onMouseEnter={() => this.setStyles(onHover)}
//         onMouseLeave={() => this.setStyles(style)}
//         style={style}
//         {...passThrough}
//       />
//     )
//   }
// }
//
// export default HoverableView
