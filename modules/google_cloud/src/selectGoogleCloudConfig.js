import { path } from 'ramda'

const selectGoogleCloudConfig = (name = 'default') => (state) => path([ 'google_cloud', 'configs', name ], state)

export default selectGoogleCloudConfig
