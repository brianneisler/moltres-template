const deleteFile = async ({ storage }, filePath) => {
  if (!storage) {
    throw new Error('storage must be supplied in context')
  }

  // NOTE BRN: Ugly HACK since the admin sdk's methods are different from those
  // on the client side. Admin sdk uses google cloud sdk while client side has
  // its own methods for uploading files to firebase
  // https://firebase.google.com/docs/storage/admin/start#use_a_custom_firebase_app
  if (!storage.bucket) {
    throw new Error('deleteFile NOT IMPLEMENTED on client side')
  }

  // we're in the node js side
  const bucket = storage.bucket()
  const file = bucket.file(filePath)
  return file.delete()
}

export default deleteFile
