import { setup } from 'moltres-tools'

const action = async (instance, args, context) => {
  const result = await setup({}, context)
  instance.log('result:', result)
}

export default action
