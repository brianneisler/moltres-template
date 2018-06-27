import Promise from 'bluebird'
import imageToAscii from 'image-to-ascii'
import path from 'path'

const loadWelcome = async () =>
  new Promise((resolve, reject) => {
    imageToAscii(
      path.resolve(__dirname, '..', '..', 'assets', 'moltres.png'),
      {
        size: {
          height: 20
        },
        white_bg: false
      },
      (error, converted) => {
        if (error) {
          return reject(error)
        }
        return resolve(converted)
      }
    )
  })

export default loadWelcome
