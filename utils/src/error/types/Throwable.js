import isString from '../../lang/isString'

class Throwable extends Error {
  constructor({ causes, data, message, type }) {
    super(isString(message) ? message : '')
    this.causes = causes || []
    this.data = data
    this.type = type
  }
}

export default Throwable
