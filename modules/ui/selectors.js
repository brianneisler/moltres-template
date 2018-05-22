import { path } from 'ramda'

export const selectUIInitialized = (state) => path([ 'ui', 'initialized' ], state)
