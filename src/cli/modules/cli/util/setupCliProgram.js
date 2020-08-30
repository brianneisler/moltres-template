import { Command } from 'commander'

import pack from '../../../../../package.json'
import {
  assoc,
  assocPath,
  compact,
  concat,
  curry,
  equals,
  findIndex,
  forEach,
  getProp,
  head,
  isArray,
  isString,
  join,
  last,
  map,
  merge,
  pipe,
  prepend,
  reduce,
  sortBy,
  split,
  splitAt,
  tail
} from '../../../../utils/lang'

import setupCliCommands from './setupCliCommands'

const getCommandParts = (command) => {
  // - split command into command parts
  let commandParts = compact(split(' ', command))
  let parameters = []
  const index = findIndex(
    (part) => part[0] === '[' || part[0] === '<',
    commandParts
  )
  if (index >= 0) {
    ;[commandParts, parameters] = splitAt(index, commandParts)
  }
  return {
    commandParts,
    commandWord: last(commandParts),
    parameters
  }
}

const enrichCommand = curry((store, command) => {
  if (!command.subcommands) {
    command = assoc('subcommands', {}, command)
  }
  command = assoc(
    'action',
    async (options, cmd, ...rest) => {
      if (command.exec) {
        return command.exec(store.getContext(), options, cmd, ...rest)
      }
      return cmd.help()
    },
    command
  )
  if (command.command) {
    return merge(command, getCommandParts(command.command))
  }
  if (command.commandParts) {
    const parameters = command.parameters || []
    return merge(command, {
      command: join(' ', concat(command.commandParts, parameters)),
      parameters
    })
  }

  throw new Error(
    `Command must specify either a 'command' prop as a String or a 'commandParts' prop as an Array. Instead recieved ${JSON.stringify(
      command,
      null,
      2
    )}`
  )
})

const assocCommand = (parts, command, group) => {
  if (parts.length === 1) {
    return assocPath(parts, command, group)
  }
  const first = head(parts)
  let parentCommand = getProp(first, group)
  if (!parentCommand) {
    // If no parent command exists, create one. This is safe to do since we
    // sorted values earlier. If we haven't already created the parent by now it
    // means it wasn't declared.
    parentCommand = enrichCommand({
      commandParts: head(
        splitAt(
          findIndex(equals(first), command.commandParts) + 1,
          command.commandParts
        )
      )
    })
  }
  return assoc(
    first,
    assoc(
      'subcommands',
      assocCommand(tail(parts), command, parentCommand.subcommands),
      parentCommand
    ),
    group
  )
}

const walkCommandTree = curry((iteratee, accum, node) => {
  forEach((value) => {
    const result = iteratee(value, accum)
    if (value.subcommands) {
      walkCommandTree(iteratee, result, value.subcommands)
    }
  }, node)
  return accum
})

const createProgramCommand = (commandObject, parentCommand) => {
  const command = parentCommand.command(
    join(' ', prepend(commandObject.commandWord, commandObject.parameters))
  )
  if (isString(commandObject.description)) {
    command.description(commandObject.description)
  }
  if (isArray(commandObject.options)) {
    forEach((option) => {
      if (option.required) {
        command.requiredOption(option.option, option.description)
      } else {
        command.option(option.option, option.description)
      }
    }, commandObject.options)
  }
  if (commandObject.action) {
    command.action(commandObject.action)
  }
  return command
}

const setupCliProgram = (store) => {
  const cliProgram = new Command()
  cliProgram.storeOptionsAsProperties(false)
  cliProgram.version(pack.version)

  // - alphabetically sort commands based on command part
  // - iterate through each command and assign each command to a map
  // - for subcommands, retrieve each top level command (if one doesn't exist then
  // create one).
  // - Assign the sub command to a subcommands property on the
  // command. (recursively follow subcommands down for commands that are more
  // than one level deep)
  // - depth first walk the commands and subcommands creating the commands +
  //   parameters in commander

  return pipe(
    map(enrichCommand(store)),
    sortBy((command) => join(' ', command.commandParts)),
    reduce(
      (accum, command) => assocCommand(command.commandParts, command, accum),
      {}
    ),
    walkCommandTree(createProgramCommand, cliProgram)
  )(setupCliCommands(store))
}

export default setupCliProgram
