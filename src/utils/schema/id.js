import Joi from '@hapi/joi'

// TODO BRN: Move this to the schemas folder
const id = () => Joi.string().alphanum().length(20)

export default id
