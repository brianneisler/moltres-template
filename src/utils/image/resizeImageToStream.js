import { createCanvas } from '../canvas'

import getResizedImageDimensions from './getResizedImageDimensions'
import loadImage from './loadImage'

const resizeImageToStream = async (imageBuffer, options) => {
  const image = await loadImage(imageBuffer)
  const { height, width } = getResizedImageDimensions(image, options)
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0, width, height)
  return canvas.createJPEGStream({ quality: 0.8 })
}

export default resizeImageToStream
