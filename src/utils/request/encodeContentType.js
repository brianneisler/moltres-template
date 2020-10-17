const encodeContentType = (contentType, data) => {
  if (contentType === 'application/json') {
    return JSON.stringify(data)
  } else if (contentType === 'text/plain') {
    return data
  }
  throw new Error('unsupported content type')
}

export default encodeContentType
