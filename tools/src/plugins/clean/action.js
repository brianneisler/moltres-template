import clean from '../../clean'

const action = async (instance, args, context) =>
  clean({}, context)

export default action
