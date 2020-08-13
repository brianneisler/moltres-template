import { isFunction } from '../lang'

const refGet = async ({ transaction }, ref) => {
  if (isFunction(ref)) {
    return await ref()
  } else if (transaction) {
    return await transaction.get(ref)
  }
  return await ref.get()
}

export default refGet
