const getResizedImageDimensions = (image, options = {}) => {
  const { maxWidth, minWidth } = options
  const { height, width } = image
  if (maxWidth && width > maxWidth) {
    return {
      height: Math.floor(maxWidth * (height / width)),
      width: maxWidth
    }
  }
  if (minWidth && width < minWidth) {
    return {
      height: Math.floor(minWidth * (height / width)),
      width: minWidth
    }
  }
  return { height, width }
}

export default getResizedImageDimensions
