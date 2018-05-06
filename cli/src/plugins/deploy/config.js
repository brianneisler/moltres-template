import action from './action'
import { createAction } from '../../util'

const config = (cli) =>
  cli
    .command('deploy', 'deploys a moltres project to firebase')
    .action(action)

export default config
