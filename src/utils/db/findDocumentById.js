import { curry } from '../lang'

import findFromRef from './findFromRef'
import refDocumentById from './refDocumentById'

const findDocumentById = curry(async (Schema, context, id, options = {}) =>
  findFromRef(context, refDocumentById(Schema, context, id), options)
)

export default findDocumentById
