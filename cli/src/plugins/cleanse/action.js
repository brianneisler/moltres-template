import { cleanse } from 'moltres-tools'

const action = async (instance, args, context) => {
  const result = await cleanse({}, context)
  instance.log('result:', result)
}

export default action
