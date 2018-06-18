import Storage from '@google-cloud/storage'
import { pick, prop } from 'moltres-utils'

const initializeGoogleCloudStorage = (name, configs) => {
  const config = prop(name, configs)
  // https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
  return new Storage(pick([ 'projectId', 'credentials' ], config))
}

export default initializeGoogleCloudStorage
