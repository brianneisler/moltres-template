const measureTextDimensions = (
  context,
  text,
  { fontFamily, fontSize, fontWeight }
) => {
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`
  return context.measureText(text)
}

export default measureTextDimensions
