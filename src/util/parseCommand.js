import Promise from 'bluebird'
import { addIndex, drop, isNil, map } from 'ramda'

const mapIndexed = addIndex(map)

const parseCommand = async (cli, argv) => {
  let args = drop(2, argv)

  args = mapIndexed((value, idx) => {
    if (idx === 0) {
      return value
    }
    if (value.indexOf(' ') > -1) {
      return `"${value}"`
    }
    return value
  }, args)

  return new Promise((resolve, reject) => {
    cli.exec(args.join(' '), (error) => {
      if (!isNil(error)) {
        return reject(error)
      }
      return resolve()
    })
  })
}

export default parseCommand
