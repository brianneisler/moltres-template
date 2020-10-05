import sha256 from 'crypto-js/sha256'

import { SHA256 } from '../../constants/Algorithm'
import { curry } from '../lang'

const hash = curry((algorithm, value) => {
  if (algorithm === SHA256) {
    return sha256(value).toString()
  }
  throw new Error(`unsupported algorithm ${algorithm}`)
})

export default hash
