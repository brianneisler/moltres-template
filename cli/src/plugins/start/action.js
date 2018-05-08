import { start } from 'moltres-tools'

const action = async (instance, args, context) => {
  const result = await start({}, context)
  instance.log('result:', result)
}

export default action
