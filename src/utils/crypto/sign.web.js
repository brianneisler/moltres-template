const sign = (input, key, method, type) => {
  if (type === 'hmac') {
    throw new Error('TODO: not implemented')
  } else if (type == 'sign') {
    throw new Error('TODO: not implemented')
  } else if (type === 'none') {
    return ''
  } else {
    throw new Error('Algorithm type not recognized')
  }
}

export default sign
