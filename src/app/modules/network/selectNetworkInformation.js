import { createSelector, select } from '../../../utils/lang'

const selectNetworkInformation = select(createSelector('network.information'))

export default selectNetworkInformation
