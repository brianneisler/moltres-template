import { path } from 'ramda'

const selectFirebaseApp = (name = 'default') => (state) => path([ 'firebase', 'apps', name ], state)

export default selectFirebaseApp
