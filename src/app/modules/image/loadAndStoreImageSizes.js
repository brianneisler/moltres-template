import { put, select } from 'redux-saga/effects'

import { isURL } from 'moltres/url'

import { setImageSizes } from './actions'
import selectImageSizes from './selectImageSizes'
import { loadImageSizes } from './util'

const loadAndStoreImageSizes = function* (context, url) {
  let result = yield select(selectImageSizes(url))
  if (!result) {
    let fullURL = url
    if (!isURL(fullURL)) {
      fullURL = `${context.config.app.url}${url[0] === '/' ? '' : '/'}${url}`
    }
    try {
      const image = yield loadImageSizes(fullURL)
      result = { url, value: image }
      yield put(setImageSizes(result))
    } catch (error) {
      result = { error, url }
      yield put(setImageSizes(result))
    }
  }
  return result
}

export default loadAndStoreImageSizes
