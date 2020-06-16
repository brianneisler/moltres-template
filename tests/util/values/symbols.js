import { Symbol } from '../../../src/utils/data/js'

const values = [Symbol('a'), Symbol.for('b')]

const symbols = () => values

export default symbols
