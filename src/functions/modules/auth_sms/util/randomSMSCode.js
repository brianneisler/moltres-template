import { random } from '../../../../utils/lang'
import { padStart } from '../../../../utils/string'

const randomSMSCode = (length) => {
  const num = random(0, Math.pow(10, length), false)
  return padStart(num, length, '0')
}

export default randomSMSCode
