import createImage from './createImage'

// TODO BRN: This should support just plain Image
const getImageMeta = (imageBuffer) => {
  const image = createImage(imageBuffer)
  return {
    height: image.height,
    length: imageBuffer.length,
    width: image.width
  }
}

export default getImageMeta
