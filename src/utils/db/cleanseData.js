import { isUndefined, omit, reject } from '../data'

const cleanseData = (data) => reject(isUndefined, omit(['id'], data))

export default cleanseData
