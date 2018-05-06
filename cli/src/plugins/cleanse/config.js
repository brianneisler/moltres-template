import action from './action'
import { createAction } from '../../util'

const config = (cli) =>
  cli
    .command('cleanse', 'cleans as well as removes install artifacts from setup')
    .action(action)

export default config
