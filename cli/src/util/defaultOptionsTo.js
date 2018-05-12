import { reduceObjIndexed } from 'moltres-utils'
import { assoc, defaultTo, has, mapObjIndexed, path, prop, propOr } from 'ramda'

const defaultOptionsTo = (args, config) =>
  assoc(
    'options',
    reduceObjIndexed(
      (optionValues, optionConfig, name) => {
        const optionValue = prop(name, optionValues)
        if (has('default', optionConfig)) {
          return assoc(
            name,
            defaultTo(prop('default', optionConfig))(optionValue),
            optionValues
          )
        }
        return optionValues
      },
      propOr({}, 'options', args),
      propOr({}, 'options', config)
    ),
    args
  )


export default defaultOptionsTo
