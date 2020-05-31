import { createSelector, select } from '../../../utils/data'

const selectNetworkInformation = select(createSelector('network.information'))

export default selectNetworkInformation
