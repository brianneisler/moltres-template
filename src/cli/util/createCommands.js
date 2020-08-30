import { map } from '../../utils/lang'

import createCommand from './createCommand'

const createCommands = (config, context, creators) =>
  map(
    (creator, name) => createCommand(config, context, name, creator),
    creators
  )

export default createCommands
