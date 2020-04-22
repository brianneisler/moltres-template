const unexpected = ({
  causes = [],
  code = 'UNEXPECTED',
  message = 'An unexpected error occurred',
  statusCode = 500
}) => {
  const error = new Error(message)
  error.type = 'UNEXPECTED'
  error.causes = causes
  error.code = code
  error.statusCode = statusCode
  return error
}

export default unexpected
