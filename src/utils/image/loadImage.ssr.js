import { loadImage as canvasLoadImage } from 'canvas'
import { invariant } from '../lang'
import { isBuffer } from '../buffer'
import { isString } from '../data'

const loadImage = async (imageSrc) => {
  invariant(
    isString(imageSrc) || isBuffer(imageSrc),
    'imageSrc must be a string or a Buffer (NOTE: ArrayBuffer is not a Buffer)'
  )
  return canvasLoadImage(imageSrc)
}

export default loadImage