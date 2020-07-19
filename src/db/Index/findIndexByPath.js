import { collection, formatDocument } from '../../utils/db'

import Index from './schemas/Index'

const findIndexByPath = async (context, path) => {
  const Indexes = collection(Index, context)
  const ref = Indexes.doc(path)
  const document = await ref.get()
  return formatDocument(document)
}

export default findIndexByPath
