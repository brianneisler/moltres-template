import { path } from 'ramda'

const selectGoogleCloudStorage = (name = 'default') => (state) => path([ 'google_cloud', 'storage', name ], state)

export default selectGoogleCloudStorage
