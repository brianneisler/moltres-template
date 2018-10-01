import Bucket from './Bucket'

class Storage {
  constructor(app) {
    this.storage = app.storage()
  }

  bucket() {}
}

export default Storage
