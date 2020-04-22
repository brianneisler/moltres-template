const createFileReadStream = ({ storage }, filePath) => {
  if (!storage) {
    throw new Error('storage must be supplied in context')
  }

  // we're in the node js side
  const bucket = storage.bucket()
  const file = bucket.file(filePath)
  return file.createReadStream()
}

export default createFileReadStream
