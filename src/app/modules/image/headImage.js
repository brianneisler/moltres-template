import { isURL } from '../../../utils/url'

import { loadImageHeaders } from './util'

const headImage = async (context, url) => {
  let fullURL = url
  if (!isURL(fullURL)) {
    fullURL = `${context.config.app.url}${url[0] === '/' ? '' : '/'}${url}`
  }
  try {
    const image = await loadImageHeaders(fullURL)
    return { url, value: image }
  } catch (error) {
    return { error, url }
  }
}

export default headImage
