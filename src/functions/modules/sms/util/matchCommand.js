import { isFunction, isRegExp } from '../../../../utils/data'

const matchCommand = (command, data) => {
  const { smsMessage } = data
  const { body } = smsMessage
  const { match } = command
  if (isRegExp(match)) {
    return body.match(match)
  } else if (isFunction(match)) {
    return match(data)
  }
  throw new Error(`Unknown match type. Expected a RegExp or a Function. Instead was given ${match}`)
}

export default matchCommand
