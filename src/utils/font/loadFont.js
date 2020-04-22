import { registerFont } from 'canvas'

const loadFont = ({ family, path }) => {
  registerFont(path, { family })
}

export default loadFont
