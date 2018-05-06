import action from './action'
import { createAction } from '../../util'

const config = (cli) =>
  cli
    .command('test', 'runs tests on a moltres project')
    .action(action)

export default config
