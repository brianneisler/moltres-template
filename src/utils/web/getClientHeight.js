import isWindow from './isWindow'

const getClientHeight = (element) =>
  isWindow(element) ? element.innerHeight : element.clientHeight

export default getClientHeight
