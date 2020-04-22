import doesWindowExist from './doesWindowExist'

const isWindow = (element) => (doesWindowExist() ? element === window : false)

export default isWindow
