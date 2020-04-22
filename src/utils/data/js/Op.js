import SYMBOL_TO_STRING_TAG from '../constants/SYMBOL_TO_STRING_TAG'

/**
 * Note: This class is **immutable**
 *
 * This class represents an Op which can be yielded and executed by Generator middleware
 */
class Op {
  /**
   * Create an `Op`
   * @param {Fn} fn
   */
  constructor(fn) {
    this.fn = fn
  }

  get [SYMBOL_TO_STRING_TAG]() {
    return 'Op'
  }
}

export default Op
