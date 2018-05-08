import { clean } from 'moltres-tools'

const action = async (instance, args, context) => {
  const result = await clean({}, context)
  instance.log('result:', result)
}

export default action
