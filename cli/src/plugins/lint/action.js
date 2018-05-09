import { lint } from 'moltres-tools'

const action = async (instance, args, context) =>
  lint({}, context)

export default action
