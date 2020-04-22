import { mergeRight, reduce, values } from '../data'

const flattenPages = (pages) =>
  values(reduce((accum, page) => mergeRight(accum, page), {}, values(pages)))

export default flattenPages
