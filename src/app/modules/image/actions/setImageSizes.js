import { createAction } from 'redux-actions'

const setImageSizes = createAction('SET_IMAGE_SIZES', ({ error, url, value }) => ({
  error,
  url,
  value
}))

export default setImageSizes
