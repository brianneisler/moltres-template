import action from './action'
import { createAction } from '../../util'

const config = (cli) =>
  cli
    .command('start', 'locally runs a moltres project')
    .action(action)

export default config
