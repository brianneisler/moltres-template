import createUpload from './createUpload'
import refUploadById from './refUploadById'
import updateUpload from './updateUpload'

const saveUpload = async (context, data) => {
  const reaction = await refUploadById(context, data.id)
  if (reaction) {
    return updateUpload(context, reaction.id, data)
  }
  return createUpload(context, data)
}

export default saveUpload
