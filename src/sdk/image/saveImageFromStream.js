import copyBufferToUint8Array from '../../utils/buffer/copyBufferToUint8Array'
import streamToBuffer from '../../utils/buffer/streamToBuffer'

import saveImageByteArray from './saveImageByteArray'

const saveImageFromStream = async (context, stream, metadata) => {
  const buffer = await streamToBuffer(stream)
  const byteArray = copyBufferToUint8Array(buffer)
  return saveImageByteArray(context, byteArray, metadata)
}

export default saveImageFromStream
