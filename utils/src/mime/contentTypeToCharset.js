import { charset } from 'mime-types'

/**
 * Lookup the implied default charset of a content-type.
 *
 * @example
 * contentTypeToCharset('text/markdown') // 'UTF-8'
 */
const contentTypeToCharset = (type) => charset(type)

export default contentTypeToCharset
