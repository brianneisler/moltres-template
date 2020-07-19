import { StyleSheet } from 'react-native'

import { isNumber, reduce, weakMemoize } from '../lang'

const HEIGHT_ATTRIBUTES = ['height', 'marginTop', 'marginBottom']

const getStyleHeight = weakMemoize((styles, name) => {
  let style = styles[name]
  if (isNumber(style)) {
    style = StyleSheet.flatten(style)
  }
  return reduce(
    (height, attrName) => {
      if (typeof style[attrName] !== 'undefined') {
        height += style[attrName]
      }
      return height
    },
    0,
    HEIGHT_ATTRIBUTES
  )
})

export default getStyleHeight
