/**
 * uploads files to the given path.
 *
 * This method is isomorphic
 *
 * @param {{ strorage: Storage }} context
 * @param {Uint8Array} byteArray
 * @param {string} filePath
 * @param {Object} metadata
 * @returns {Promise}
 */
const uploadFileByteArray = async (
  { storage },
  byteArray,
  filePath,
  metadata = {}
) => {
  // NOTE BRN: Ugly HACK since the admin sdk's methods are different from those
  // on the client side. Admin sdk uses google cloud sdk while client side has
  // its own methods for uploading files to firebase
  // https://firebase.google.com/docs/storage/admin/start#use_a_custom_firebase_app
  if (!storage) {
    throw new Error('storage must be supplied in context')
  }

  if (!storage.bucket) {
    // we're in the client side
    const ref = storage.ref(filePath)
    const result = await ref.put(byteArray, metadata)
    return result
  }

  // we're in the node js side
  const bucket = storage.bucket()
  const file = bucket.file(filePath)
  const result = await file.save(byteArray, { metadata, resumable: false })
  return result
}

export default uploadFileByteArray
