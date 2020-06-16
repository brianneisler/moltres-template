import measureTextDimensions from './measureTextDimensions'

const determineFontSize = (
  context,
  text,
  { fontFamily, fontWeight, maxWidth, padding }
) => {
  let fontSize = 60
  let done = false
  while (!done) {
    const textDimensions = measureTextDimensions(context, text, {
      fontFamily,
      fontSize,
      fontWeight
    })
    if (textDimensions.width + padding * 2 <= maxWidth || fontSize === 4) {
      done = true
    } else {
      fontSize -= 1
    }
  }
  return fontSize
}

export default determineFontSize
