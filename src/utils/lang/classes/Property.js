import { TO_STRING_TAG } from '../constants/Symbol'

class Property {
  constructor(value) {
    this.value = value
  }

  get [TO_STRING_TAG]() {
    return 'Property'
  }

  valueOf() {
    return this.value
  }
}

export default Property
