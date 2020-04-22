const determineFontLineWidth = ({ fontSize }) => {
  if (fontSize < 20) {
    return 1
  } else if (fontSize < 40) {
    return 2
  }
  return 3
}

export default determineFontLineWidth
