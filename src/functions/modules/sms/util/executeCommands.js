import { map, values } from '../../../../utils/data'
import matchCommand from './matchCommand'

const executeCommands = async (context, data) =>
  map(async (command) => {
    const matched = matchCommand(command, data)
    if (matched) {
      return command.exec(context, { ...data, matched })
    }
    return null
  }, values(data.commands))

export default executeCommands
