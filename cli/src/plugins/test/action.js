import { test } from 'moltres-tools'

const action = async (instance, args, context) => {
  const result = await test({}, context)
  instance.log('result:', result)
}

export default action
