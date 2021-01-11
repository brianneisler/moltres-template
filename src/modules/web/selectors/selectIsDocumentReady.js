import { createSelector, select } from '../../../utils/lang'

const selectIsDocumentReady = select(createSelector('web.isDocumentReady'))

export default selectIsDocumentReady
