import { deploy } from 'moltres-tools'

const action = async (instance, args, context) => {
  const result = await deploy({}, context)
  instance.log('result:', result)
}
export default action
