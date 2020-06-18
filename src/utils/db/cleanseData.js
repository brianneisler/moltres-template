import { isUndefined, omit, reject } from '../lang'

const cleanseData = (data) => reject(isUndefined, omit(['id'], data))

export default cleanseData
