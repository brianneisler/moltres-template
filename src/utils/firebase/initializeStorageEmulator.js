import { bufferToStream, createBuffer } from '../buffer'
import { assoc, getProperty } from '../lang'

const createFile = () => {
  let data

  const createReadStream = () => {
    return bufferToStream(createBuffer(data))
  }
  const createWriteStream = () => {}

  const _delete = async () => {
    data = undefined
  }
  const save = async (byteArray) => {
    data = byteArray
  }
  return {
    createReadStream,
    createWriteStream,
    delete: _delete,
    save
  }
}

const createBucket = () => {
  let files = {}
  const generateFile = (filePath) => {
    let file = getProperty(filePath, files)
    if (file) {
      return file
    }

    file = createFile()
    files = assoc(filePath, file, files)
    return file
  }

  const file = (filePath) => generateFile(filePath)

  return {
    file
  }
}

const initializeStorageEmulator = () => {
  let buckets = {}

  const generateBucket = (bucketName) => {
    let bucket = getProperty(bucketName, buckets)
    if (bucket) {
      return bucket
    }

    bucket = createBucket()
    buckets = assoc(bucketName, bucket, buckets)
    return bucket
  }

  const bucket = (bucketName) => {
    if (!bucketName) {
      return generateBucket('default')
    }
    return generateBucket(bucketName)
  }

  return {
    bucket
  }
}

export default initializeStorageEmulator
