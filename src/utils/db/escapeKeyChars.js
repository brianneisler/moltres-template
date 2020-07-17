import { keys, reduce, replaceAll } from '../lang'

const KEY_CHAR_ESCAPES = {
  '#': '(H)',
  $: '(D)',
  '.': '(P)',
  '/': '(FS)',
  '[': '(OB)',
  ']': '(CB)'
}

const ESCAPE_CHARS = keys(KEY_CHAR_ESCAPES)

// export function stringify(pathParts, opts = {}) {
//   return _.isArray(pathParts) ? joinPathParts(pathParts, opts) : pathParts
// }

// export function joinPathParts(pathParts, opts = {}) {
//   const mappedFn = _.get(opts, 'escape', true) ? escapePathPart : _.identity
//   return _.map(pathParts, mappedFn).join('/')
// }

const escapeKeyChars = (key) =>
  reduce(
    (result, char) => {
      const escape = KEY_CHAR_ESCAPES[char]
      return replaceAll(result, char, escape)
    },
    key,
    ESCAPE_CHARS
  )

export default escapeKeyChars

// export function unescapePathPart(pathPart) {
//   return _.reduce(
//     PATH_ESCAPES,
//     (result, value, key) => {
//       return StringUtil.replaceAll(result, value, key)
//     },
//     pathPart
//   )
// }
