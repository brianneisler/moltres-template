import { path } from 'ramda'

export const selectFirebaseApp = (name = 'default') => (state) => path([ 'firebase', 'apps', name ], state)
