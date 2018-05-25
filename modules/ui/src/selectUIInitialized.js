import { path } from 'ramda'

const selectUIInitialized = (state) => path([ 'ui', 'initialized' ], state)

export default selectUIInitialized
