const getNativeEventTarget = (nativeEvent) => {
  if (nativeEvent.target) {
    return nativeEvent.target
  }
  if (nativeEvent.srcElement) {
    return nativeEvent.srcElement
  }
  if (nativeEvent.path) {
    return nativeEvent.path[0]
  }
  throw new Error('cannot find nativeEvent target')
}

export default getNativeEventTarget
