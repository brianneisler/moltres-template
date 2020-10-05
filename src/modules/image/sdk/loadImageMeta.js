import getImageMeta from '../../../utils/image/getImageMeta'
import downloadFile from '../../../utils/storage/downloadFile'

import getImageById from './getImageById'
import updateImage from './updateImage'

const loadImageMeta = async (context, imageId) => {
  let image = await getImageById(context, imageId)
  let buffer
  if (!image.height || !image.length || !image.width) {
    buffer = await downloadFile(context, image.path)
    const meta = await getImageMeta(buffer)
    image = await updateImage(context, imageId, meta)
  }
  return {
    ...image,
    buffer
  }
}

export default loadImageMeta
