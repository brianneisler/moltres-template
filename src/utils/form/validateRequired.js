const validateRequired = (value) =>
  value || typeof value === 'number' ? undefined : 'Required'

export default validateRequired
