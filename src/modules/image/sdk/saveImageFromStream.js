import { copyBufferToUint8Array, streamToBuffer } from '../../../utils/buffer'

import saveImageByteArray from './saveImageByteArray'

const saveImageFromStream = async (context, stream, metadata) => {
  const buffer = await streamToBuffer(stream)
  const byteArray = copyBufferToUint8Array(buffer)
  return saveImageByteArray(context, byteArray, metadata)
}

export default saveImageFromStream
