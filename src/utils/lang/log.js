const log = (value) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(value, null, 2))
  return value
}

export default log
