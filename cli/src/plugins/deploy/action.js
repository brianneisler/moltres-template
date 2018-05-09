import { deploy } from 'moltres-tools'

const action = async (instance, args, context) =>
  await deploy({}, context)
export default action
