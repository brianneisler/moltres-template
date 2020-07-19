import WebFont from 'webfontloader'

import expected from '../error/expected'

const loadFont = async ({ family, urls }) => {
  return new Promise((resolve, reject) => {
    WebFont.load({
      custom: {
        families: [family],
        urls
      },
      fontactive: (familyName) => {
        if (familyName === family) {
          resolve()
        }
      },
      fontinactive: (familyName) => {
        if (familyName === family) {
          reject(
            expected({
              code: 'COULD_NOT_LOAD_FONT',
              message: `Could not load the font ${familyName}`
            })
          )
        }
      }
    })
  })
}

export default loadFont
