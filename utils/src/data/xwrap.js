class XWrap {
  constructor(fn) {
    this.f = fn
  }

  ['@@transducer/init']() {
    throw new Error('init not implemented on XWrap')
  }
  ['@@transducer/result'](acc) {
    return acc
  }
  ['@@transducer/step'](acc, x) {
    return this.f(acc, x)
  }
}

const xwrap = (fn) => new XWrap(fn)

export default xwrap
