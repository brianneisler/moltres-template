import { curry, getPath } from '../../../utils/data'

const selectOverlay = curry((name, state) => getPath(['overlay', 'instances', name], state))

export default selectOverlay
