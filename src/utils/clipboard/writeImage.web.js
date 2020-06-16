import imageToBlob from '../image/imageToBlob'

const selectElement = (element) => {
  // if (document.body.createTextRange) {
  //   const range = document.body.createTextRange()
  //   range.moveToElementText(element)
  //   return range.select()
  // }
  const selection = window.getSelection()
  selection.removeAllRanges()
  const range = document.createRange()
  range.selectNodeContents(element)
  selection.addRange(range)
  return selection
}

const copyElementAsText = (element) => {
  const { body } = document
  const node = document.createElement('div')
  node.style.opacity = '0'
  node.style.position = 'absolute'
  node.style.whiteSpace = 'pre-wrap'
  node.contentEditable = true
  node.readOnly = false
  node.appendChild(element)
  body.appendChild(node)

  const selection = selectElement(node)
  document.execCommand('copy')

  selection.removeAllRanges()
  body.removeChild(node)
}

const hasClipboardAPI = () =>
  typeof ClipboardItem !== undefined &&
  !!navigator.clipboard &&
  !!navigator.clipboard.write

const writeImageUsingClipboardAPI = async (image) => {
  const blob = await imageToBlob(image)
  return navigator.clipboard.write([
    // eslint-disable-next-line no-undef
    new ClipboardItem({
      'image/png': blob
    })
  ])
}

// NOTE BRN: This is based on https://stackoverflow.com/questions/33175909/copy-image-to-clipboard
const writeImageAsText = (image) => {
  return copyElementAsText(image)
}

const writeImage = async (image) => {
  if (hasClipboardAPI()) {
    try {
      return writeImageUsingClipboardAPI(image)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }
  return writeImageAsText(image)
}

export default writeImage
