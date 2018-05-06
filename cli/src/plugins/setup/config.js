import action from './action'
import { createAction } from '../../util'

const config = (cli) =>
  cli
    .command('setup', 'sets up a moltres project and installs all dependencies')
    .action(action)

export default config
