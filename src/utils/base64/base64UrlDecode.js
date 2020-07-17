import { createBuffer } from '../buffer'

import base64urlUnescape from './base64UrlUnescape'

const base64UrlDecode = (str) =>
  createBuffer(base64urlUnescape(str), 'base64').toString()

export default base64UrlDecode
