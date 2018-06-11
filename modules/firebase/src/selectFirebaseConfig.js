import { path } from 'ramda'

const selectFirebaseConfig = (appName = 'default') => (state) => path([ 'firebase', 'configs', appName ], state)

export default selectFirebaseConfig
