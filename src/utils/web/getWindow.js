import doesWindowExist from './doesWindowExist'

// NOTE BRN: We do not model "window" here. We model an element that has the
// necessary properties to mock scroll
const DUMMY_WINDOW = {
  addEventListener: () => {},
  clientHeight: 0,
  navigator: {},
  removeEventListener: () => {},
  scrollHeight: 20000,
  scrollTop: 0
}

let _window
const getWindow = () => {
  if (!_window) {
    _window = doesWindowExist() ? window : DUMMY_WINDOW
  }
  return _window
}

export default getWindow
