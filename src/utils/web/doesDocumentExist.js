import doesWindowExist from './doesWindowExist'

/**
 * Returns `true` if both the global window and the window's document exist
 */
const doesDocumentExist = () => !!(doesWindowExist() && window.document)

export default doesDocumentExist
