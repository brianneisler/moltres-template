import curry from './curry'

class XMap {
  constructor(func, xfunc) {
    this.xf = xfunc
    this.f = func
  }

  ['@@transducer/init']() {
    return this.xf['@@transducer/init']()
  }

  ['@@transducer/result'](result) {
    return this.xf['@@transducer/result'](result)
  }

  ['@@transducer/step'](result, input) {
    return this.xf['@@transducer/step'](result, this.f(input))
  }
}

const xmap = curry((func, xfunc) => new XMap(func, xfunc))

export default xmap
