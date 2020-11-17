import { createAction } from 'moltres/redux'

const setNetworkInformation = createAction(
  'SET_NETWORK_INFORMATION',
  ({ information }) => ({
    information
  })
)

export default setNetworkInformation
