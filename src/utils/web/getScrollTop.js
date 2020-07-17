import isWindow from './isWindow'

const getScrollTop = (element) =>
  isWindow(element) ? element.scrollY : element.scrollTop

export default getScrollTop
