import { createAction } from 'redux-actions'

const setNetworkInformation = createAction(
  'SET_NETWORK_INFORMATION',
  ({ information }) => ({
    information
  })
)

export default setNetworkInformation
