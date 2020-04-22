import { Image } from 'canvas'

const createImage = (imageSrc) => {
  const image = new Image()
  image.src = imageSrc
  return image
}

export default createImage
