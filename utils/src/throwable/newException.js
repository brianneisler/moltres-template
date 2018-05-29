const newException = (message) => {
  const error = new Error(message)
  error.type = 'exception'
  return error
}

export default newException
