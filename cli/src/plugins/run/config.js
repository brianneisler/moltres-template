import action from './action'
import { createAction } from '../../util'

const config = (cli) =>
  cli
    .command('run <script>', 'runs a script')
    .action(action)

export default config
