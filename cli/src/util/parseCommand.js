import { addIndex, drop, map } from 'moltres-utils'

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

  return cli.exec(args.join(' '))
}

export default parseCommand
