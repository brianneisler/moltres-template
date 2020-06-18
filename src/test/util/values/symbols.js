import { Symbol } from '../../../utils/lang/js'

const values = [Symbol('a'), Symbol.for('b')]

const symbols = () => values

export default symbols
