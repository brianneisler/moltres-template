// import { sha256 } from 'cryptoJs'

// TODO BRN: update this to use crypto-js
// const hashFile = (filePath, algorithm = 'md5') => {
//   new Promise((resolve, reject) => {
//     const shasum = crypto.createHash(algorithm)
//     try {
//       const stream = fs.ReadStream(filePath)
//       stream.on('data', (data) => {
//         shasum.update(data)
//       })
//       stream.on('end', () => {
//         const hash = shasum.digest('hex')
//         return resolve(hash)
//       })
//     } catch (error) {
//       return reject(error)
//     }
//   })
// }

// export default hashFile
