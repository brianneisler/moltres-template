import Prompt from 'prompt'
import Promise from 'bluebird'

export default function prompt(schema) {
  return new Promise((resolve, reject) => {
    Prompt.start()
    Prompt.get(schema, (error, result) => {
      if (error) {
        return reject(error)
      }
      return resolve(result)
    })
  })
}
