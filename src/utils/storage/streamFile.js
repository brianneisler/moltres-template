const streamFile = ({ storage }, filePath) => {
  // NOTE BRN: Ugly HACK since the admin sdk's methods are different from those
  // on the client side. Admin sdk uses google cloud sdk while client side has
  // its own methods for uploading files to firebase
  // https://firebase.google.com/docs/storage/admin/start#use_a_custom_firebase_app
  if (!storage) {
    throw new Error('storage must be supplied in context')
  }

  if (!storage.bucket) {
    throw new Error('downloadFile NOT IMPLEMENTED on client side')
    // we're in the client side
    // const ref = storage.ref(filePath)
  }

  // we're in the node js side
  const bucket = storage.bucket()
  const file = bucket.file(filePath)
  return file.createReadStream()
}

export default streamFile
