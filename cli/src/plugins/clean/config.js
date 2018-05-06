import action from './action'
import { createAction } from '../../util'

const config = (cli) =>
  cli
    .command('clean', 'removes build artifacts from a moltres project')
    .action(action)

export default config
