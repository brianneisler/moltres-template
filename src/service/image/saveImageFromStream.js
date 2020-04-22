import copyBufferToUint8Array from '../../utils/buffer/copyBufferToUint8Array'
import saveImageByteArray from './saveImageByteArray'
import streamToBuffer from '../../utils/buffer/streamToBuffer'

const saveImageFromStream = async (context, stream, metadata) => {
  const buffer = await streamToBuffer(stream)
  const byteArray = copyBufferToUint8Array(buffer)
  return saveImageByteArray(context, byteArray, metadata)
}

export default saveImageFromStream
