import lint from '../../lint'

const action = async (instance, args, context) =>
  lint({}, context)

export default action
