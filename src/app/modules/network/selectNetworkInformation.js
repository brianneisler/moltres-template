import { createSelector, select } from 'moltres/lang'

const selectNetworkInformation = select(createSelector('network.information'))

export default selectNetworkInformation
