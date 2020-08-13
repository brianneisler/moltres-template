import {
  curry,
  isArray,
  isNumber,
  isObject,
  isString,
  reduce,
  zip
} from '../lang'

import collection from './collection'
import getSchemaLineage from './getSchemaLineage'

/**
 * @param {Schema} schema
 * @param {Context} context
 * @param {string|Array} ids
 * @returns {DocumentReference}
 */
const refDocumentById = curry((Schema, context, ids) => {
  // accepts an object { ids: [id1, id2] }
  if (isObject(ids) && !isArray(ids)) {
    ;({ ids } = ids)
  }
  if (isNumber(ids)) {
    ids = ids.toString()
  }
  if (isString(ids)) {
    ids = [ids]
  }
  // accepts a s [id1, id2]
  if (!isArray(ids)) {
    throw new TypeError(
      'refDocumentById expects ids to be an Object, a String, a Number or an Array'
    )
  }
  const schemas = getSchemaLineage(Schema)
  if (schemas.length < ids.length) {
    throw new Error(
      `ids contains too many ids for the given Schema ${Schema.name} - ids: ${ids}`
    )
  } else if (schemas.length > ids.length) {
    throw new Error(
      `ids contains too few ids for the given Schema ${Schema.name} - ids: ${ids}`
    )
  }
  return reduce(
    (parentRef, [schema, id]) => {
      const ParentCollection = collection(schema, {
        ...context,
        parentRef
      })
      return ParentCollection.doc(id.toString())
    },
    context.parentRef,
    zip(schemas, ids)
  )
})

export default refDocumentById
