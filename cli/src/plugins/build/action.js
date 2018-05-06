import { build } from 'moltres-tools'

const action = async (instance, args, context) => {
  //const { cwd } = context
  instance.log('args:', args)
  instance.log('context:', context)
}

export default action
