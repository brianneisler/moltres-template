import { getProp, map } from '../data'

const idsOfValues = (vals) => map(getProp('id'), vals)

export default idsOfValues
