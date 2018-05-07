import { build } from 'moltres-tools'

const action = async (instance, args, context) => {
  const result = await build({}, context)
  instance.log('result:', result)
}

export default action
