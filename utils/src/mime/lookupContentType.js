import { lookup } from 'mime-types'

/**
 * Lookup the content-type associated with a file.
 *
 * @example
 * lookupContentType('json')             // 'application/json'
 * lookupContentType('.md')              // 'text/markdown'
 * lookupContentType('file.html')        // 'text/html'
 * lookupContentType('folder/file.js')   // 'application/javascript'
 * lookupContentType('folder/.htaccess') // false
 *
 * lookupContentType('cats') // false
 */
const lookupContentType = (path) => lookup(path)

export default lookupContentType
