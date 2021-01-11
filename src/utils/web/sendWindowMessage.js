import getWindow from './getWindow'

const sendWindowMessage = (message, targetOrigin = '*') => {
  return getWindow().postMessage(message, targetOrigin)
}

export default sendWindowMessage
