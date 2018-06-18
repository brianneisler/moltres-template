import capitalize from './capitalize'
import words from './words'

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @see lowerCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * camelCase('Foo Bar')
 * // => 'fooBar'
 *
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__')
 * // => 'fooBar'
 */
const camelCase = (string) => (
  words(`${string}`.replace(/['\u2019]/g, '')).reduce((result, word, index) => {
    word = word.toLowerCase()
    return result + (index ? capitalize(word) : word)
  }, '')
)

export default camelCase
