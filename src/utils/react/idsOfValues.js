import { getProperty, map } from '../lang'

const idsOfValues = (vals) => map(getProperty('id'), vals)

export default idsOfValues
