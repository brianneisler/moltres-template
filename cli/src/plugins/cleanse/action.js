import { cleanse } from 'moltres-tools'

const action = async (instance, args, context) =>
  cleanse({}, context)


export default action
