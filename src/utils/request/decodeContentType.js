const decodeContentType = (contentType, data) => {
  if (contentType === 'application/json') {
    return JSON.parse(data)
  } else if (contentType === 'text/plain') {
    return data
  }
  throw new Error('unsupported content type')
}

export default decodeContentType
