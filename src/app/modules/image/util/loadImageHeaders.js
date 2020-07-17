import fetch from '../../../../utils/request/fetch'

const loadImageHeaders = async (url) => {
  const response = await fetch(url, {
    method: 'HEAD'
  })
  return {
    ...response.headers,
    height: parseInt(response.headers.get('Image-Height')),
    length: parseInt(response.headers.get('Content-Length')),
    width: parseInt(response.headers.get('Image-Width'))
  }
}

export default loadImageHeaders
