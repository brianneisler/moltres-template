import isFunction from './isFunction'
import objectKeys from './objectKeys'

class Protocol {
  constructor(def) {
    this.def = def
    this.keys = objectKeys(def)
  }

  extend(def) {
    return new Protocol({
      ...this.def,
      ...def
    })
  }

  inherit(extendable) {
    if (!extendable || !isFunction(extendable.extend)) {
      throw new Error('Expected Extendable data type')
    }
    return extendable.extend(this.def)
  }

  isSatisfied(value) {
    if (!value) {
      return false
    }

    let index = -1
    const { keys } = this
    let size = keys.length

    while (size--) {
      const key = keys[++index]
      if (!isFunction(value[key])) {
        return false
      }
    }
    return true
  }
}

const defprotocol = (def) => new Protocol(def)

export default defprotocol
