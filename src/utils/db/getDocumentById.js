import { curry } from '../lang'

import getFromRef from './getFromRef'
import refDocumentById from './refDocumentById'

const getDocumentById = curry(async (Schema, context, id, options = {}) =>
  getFromRef(context, refDocumentById(Schema, context, id), options)
)

export default getDocumentById
