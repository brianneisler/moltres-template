import curry from './curry'
import map from './map'
import select from './select'

const mapSelect = curry((selectors, props) => map((selector) => select(selector, props), selectors))

export default mapSelect
