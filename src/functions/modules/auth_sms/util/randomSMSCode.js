import { random } from 'moltres/lang'
import { padStart } from 'moltres/string'

const randomSMSCode = (length) => {
  const num = random(0, Math.pow(10, length), false)
  return padStart(num, length, '0')
}

export default randomSMSCode
