import { run } from 'moltres-tools'

const action = async (instance, args, context) => {
  const result = await run({}, context)
  instance.log('result:', result)
}

export default action
