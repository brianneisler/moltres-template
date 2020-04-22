import createCanvas from '../canvas/createCanvas'

const imageToCanvas = (image) => {
  const canvas = createCanvas(image.width, image.height)
  const canvasContext = canvas.getContext('2d')
  canvasContext.drawImage(image, 0, 0)
  return canvas
}

export default imageToCanvas
