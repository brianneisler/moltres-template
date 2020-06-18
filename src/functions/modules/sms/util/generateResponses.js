import { compact } from '../../../../utils/lang'
import executeCommands from './executeCommands'

const generateResponses = async (context, data) => {
  const responses = compact(await executeCommands(context, data))
  if (responses.length === 0) {
    return [
      {
        message: `Hi! I'm the WAT Duck! Send me a photo with the text "wat this?" to add it to WAT ${context.config.app.url}`
      }
    ]
  }
  return responses
}

export default generateResponses
