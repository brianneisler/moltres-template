// (new Date()).toISOString()
const pad = (n) => (n < 10 ? '0' + n : n)

const rfc3339TimestampString = (date) =>
  date.getUTCFullYear() +
  '-' +
  pad(date.getUTCMonth() + 1) +
  '-' +
  pad(date.getUTCDate()) +
  'T' +
  pad(date.getUTCHours()) +
  ':' +
  pad(date.getUTCMinutes()) +
  ':' +
  pad(date.getUTCSeconds()) +
  'Z'

export default rfc3339TimestampString
