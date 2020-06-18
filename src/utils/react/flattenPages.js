import { mergeRight, reduce, values } from '../lang'

const flattenPages = (pages) =>
  values(reduce((accum, page) => mergeRight(accum, page), {}, values(pages)))

export default flattenPages
