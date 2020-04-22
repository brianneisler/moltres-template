// NOTE BRN: This code is based on this https://stackoverflow.com/questions/30694433/how-to-give-browser-save-image-as-option-to-button
const downloadCanvas = async (canvas, fileName) => {
  // window.open(canvas.toDataURL('image/png'));
  const dataURL = canvas.toDataURL('png')
  const link = document.createElement('a')
  link.href = dataURL
  link.download = fileName
  link.click()
}

export default downloadCanvas
