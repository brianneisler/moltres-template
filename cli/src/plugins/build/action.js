import { build } from 'moltres-tools'

const action = async (instance, args, context) =>
  build({}, context)

export default action
