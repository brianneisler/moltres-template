const expected = ({
  causes = [],
  code = 'EXPECTED',
  message = 'An expected error occurred',
  statusCode = 400
}) => {
  const error = new Error(message)
  error.type = 'EXPECTED'
  error.causes = causes
  error.code = code
  error.statusCode = statusCode
  return error
}

export default expected
