import { expected } from '../../../utils/error'
import fetch from '../../../utils/request/fetch'

const uploadUserProfileImage = async (
  { api },
  { idToken, userProfileImage }
) => {
  const formData = new FormData()
  formData.append('image', userProfileImage.image)
  const response = await fetch(`${api.url}/userprofileimage`, {
    body: formData,
    headers: {
      Accept: 'application/json',
      Authorization: idToken,
      'Content-Type': 'multipart/form-data'
    },
    method: 'POST'
  })
  const result = await response.json()
  if (response.status === 200) {
    return result
  }
  // Our server should respond with json. Otherwise something serious went wrong.
  throw expected(result.error)
}
export default uploadUserProfileImage
