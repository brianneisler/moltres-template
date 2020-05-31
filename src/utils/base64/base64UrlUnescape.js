const base64UrlUnescape = (str) => {
  str += new Array(5 - (str.length % 4)).join('=')
  return str.replace(/\-/g, '+').replace(/_/g, '/')
}

export default base64UrlUnescape
