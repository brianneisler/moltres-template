const isPermissionsError = (error) =>
  error.message.includes('Missing or insufficient permissions') ||
  error.message.includes('PERMISSION_DENIED') ||
  error.message.includes('null value error') ||
  error.message.includes('false for')

export default isPermissionsError
