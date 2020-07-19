import { assoc, find, reduce } from '../lang'

import formatDocument from './formatDocument'

const formatSnapshotDocuments = (snapshot, options) =>
  reduce(
    (docs, document) => {
      const formatted = formatDocument(document, options)
      if (!formatted) {
        return docs
      }
      return assoc(document.id, formatted, docs)
    },
    {},
    snapshot.docs
  )

const formatSnapshot = (snapshot, options = {}) => {
  let document
  if (snapshot.docs) {
    if (!options.findOne && !options.getOne) {
      return formatSnapshotDocuments(snapshot, options)
    }
    if (options.includeRemoved) {
      document = snapshot.docs[0]
    } else {
      document = find((doc) => doc.data().removedAt == null, snapshot.docs)
    }
  } else {
    // QuerySnapshot is actually a DocumentSnapshot
    document = snapshot
  }
  return formatDocument(document, options)
}

export default formatSnapshot
