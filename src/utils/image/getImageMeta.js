import loadImage from './loadImage'

// TODO BRN: This should support just plain Image
const getImageMeta = async (imageBuffer) => {
  const image = await loadImage(imageBuffer)
  return {
    height: image.height,
    length: imageBuffer.length,
    width: image.width
  }
}

export default getImageMeta
