const xfBase = {
  init: function() {
    return this.xf['@@transducer/init']()
  },
  result: function(result) {
    return this.xf['@@transducer/result'](result)
  }
}

export default xfBase
