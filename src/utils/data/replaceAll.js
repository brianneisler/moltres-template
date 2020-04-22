import escapeRegExp from './escapeRegExp'

const replaceAll = (value, search, replacement) =>
  value.replace(new RegExp(escapeRegExp(search), 'g'), replacement)

export default replaceAll
