import { extension } from 'mime-types'

/**
 * Get the default extension for a content-type.
 *
 * @example
 * contentTypeToExtention('application/octet-stream') // 'bin'
 */
const contentTypeToExtension = (type) => extension(type)

export default contentTypeToExtension
