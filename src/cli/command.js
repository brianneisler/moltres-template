import _ from 'mudash'
import dispatch from './dispatch'
import { command } from './drivers/commands/actions'

export default _.compose(dispatch, command)
