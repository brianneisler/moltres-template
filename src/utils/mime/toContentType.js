import { contentType } from 'mime-types'

/**
 * Create a full content-type header given a content-type or extension.
 *
 * @example
 * toContentType('markdown')  // 'text/x-markdown; charset=utf-8'
 * toContentType('file.json') // 'application/json; charset=utf-8'
 *
 * toContentType(path.extname('/path/to/file.json')) // 'application/json
 */
const toContentType = (type) => contentType(type)

export default toContentType
