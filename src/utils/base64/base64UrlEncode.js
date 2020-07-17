import { createBuffer } from '../buffer'

import base64UrlEscape from './base64UrlEscape'

const base64UrlEncode = (str) =>
  base64UrlEscape(createBuffer(str).toString('base64'))

export default base64UrlEncode
