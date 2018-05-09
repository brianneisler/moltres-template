import { clean } from 'moltres-tools'

const action = async (instance, args, context) =>
  clean({}, context)

export default action
