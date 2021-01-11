import md5 from 'crypto-js/md5'
import sha256 from 'crypto-js/sha256'

import { MD5, SHA256 } from '../../constants/Algorithm'
import { curry } from '../lang'

const HASH_FUNCTIONS = {
  [MD5]: md5,
  [SHA256]: sha256
}

const hash = curry((algorithm, value) => {
  const hashFunction = HASH_FUNCTIONS[algorithm]
  if (!hashFunction) {
    throw new Error(`unsupported algorithm ${algorithm}`)
  }
  hashFunction(value).toString()
})

export default hash
