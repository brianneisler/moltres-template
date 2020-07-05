import doesDocumentExist from './doesDocumentExist'

const canUseDOM = () => !!(doesDocumentExist() && window.document.createElement)

export default canUseDOM
