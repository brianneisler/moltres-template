import { Symbol } from '../../utils/lang/classes'

const values = [Symbol('a'), Symbol.for('b')]

const symbols = () => values

export default symbols
