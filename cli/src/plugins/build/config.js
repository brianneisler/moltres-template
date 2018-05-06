import action from './action'
import { createAction } from '../../util'

const config = (cli) =>
  cli
    .command('build', 'builds a moltres project')
    .action(action)

export default config
