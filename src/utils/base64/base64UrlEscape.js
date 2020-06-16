const base64UrlEscape = (str) =>
  str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')

export default base64UrlEscape
