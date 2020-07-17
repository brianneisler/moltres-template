import { getProp, map } from '../lang'

const idsOfValues = (vals) => map(getProp('id'), vals)

export default idsOfValues
