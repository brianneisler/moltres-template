import CryptoJS from 'crypto-js'

// https://github.com/jakubzapletal/crypto-js/blob/master/README.md#progressive-hashing
const hashStream = async (stream, algorithm = 'SHA256') =>
  new Promise((resolve, reject) => {
    let shasum = CryptoJS.algo[algorithm].create()
    try {
      stream.on('data', (data) => {
        shasum = shasum.update(data.toString())
      })
      stream.on('error', (error) => {
        reject(error)
      })
      stream.on('end', () => {
        const hash = shasum.finalize()
        return resolve(hash.toString())
      })
    } catch (error) {
      return reject(error)
    }
  })

export default hashStream
