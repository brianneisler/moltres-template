import imageToCanvas from './imageToCanvas'

const imageToBlob = async (image) => {
  const canvas = imageToCanvas(image)
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob))
  })
}

export default imageToBlob
