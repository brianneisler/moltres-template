import { TO_STRING_TAG } from '../constants/Symbol'

class Index {
  constructor(value) {
    this.value = value
  }

  get [TO_STRING_TAG]() {
    return 'Index'
  }

  valueOf() {
    return this.value
  }
}

export default Index
