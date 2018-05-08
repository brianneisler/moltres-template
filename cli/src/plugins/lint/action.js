import { lint } from 'moltres-tools'

const action = async (instance, args, context) => {
  const result = await lint({}, context)
  instance.log('result:', result)
}

export default action
