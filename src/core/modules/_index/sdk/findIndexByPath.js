import { collection, formatDocument, refGet } from '../../../../utils/db'
import { Index } from '../schemas'

const findIndexByPath = async (context, path) => {
  const Indexes = collection(Index, context)
  const ref = Indexes.doc(path)
  const document = await refGet(context, ref)
  return formatDocument(document)
}

export default findIndexByPath
