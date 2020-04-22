import { createCanvas } from 'canvas'
import createImage from './createImage'
import getResizedImageDimensions from './getResizedImageDimensions'

const resizeImageToStream = (imageBuffer, options) => {
  const image = createImage(imageBuffer)
  const { height, width } = getResizedImageDimensions(image, options)
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0, width, height)
  return canvas.createJPEGStream({ quality: 0.8 })
}

export default resizeImageToStream
