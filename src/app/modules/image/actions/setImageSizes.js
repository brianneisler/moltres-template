import { createAction } from '../../../../utils/redux'

const setImageSizes = createAction(
  'SET_IMAGE_SIZES',
  ({ error, url, value }) => ({
    error,
    url,
    value
  })
)

export default setImageSizes
