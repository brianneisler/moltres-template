import { compose } from 'ramda'
import auth from './auth'
import sms from './sms'

const api = compose(
  auth,
  sms
)

export default api
