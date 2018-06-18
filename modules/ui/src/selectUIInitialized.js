import { path } from 'moltres-utils'

const selectUIInitialized = (state) => path([ 'ui', 'initialized' ], state)

export default selectUIInitialized
