import createError from './createError'
import refErrorById from './refErrorById'
import updateError from './updateError'

const saveError = async (context, data) => {
  const reaction = await refErrorById(context, data.id)
  if (reaction) {
    return updateError(context, reaction.id, data)
  }
  return createError(context, data)
}

export default saveError
