import isWindow from './isWindow'

const getScrollHeight = (element) =>
  isWindow(element) ? element.document.body.scrollHeight : element.scrollHeight

export default getScrollHeight
