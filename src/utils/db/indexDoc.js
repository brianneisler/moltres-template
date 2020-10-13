import { getProperty, join, map } from '../lang'

const indexDoc = ({ database }, collectionName, index, value) => {
  const Indexes = database.collection('Indexes')
  const indexName = join('_', index)
  const indexKey = join(
    '_',
    map((key) => getProperty(key, value), index)
  )
  return Indexes.doc(`${collectionName}/${indexName}/${indexKey}`)
}

export default indexDoc
