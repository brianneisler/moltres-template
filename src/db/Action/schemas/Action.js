import { Timestamped } from '../../Timestamped'
import Joi from '@hapi/joi'

const REGEX_RFC3339_TIMESTAMP = /^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])[Tt]([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(([Zz])|([\+|\-]([01][0-9]|2[0-3]):[0-5][0-9]))$/

// Based on cloudevents spec https://github.com/cloudevents/spec/blob/master/spec.md
const Action = {
  collectionName: 'Actions',
  name: 'Action',
  schema: Timestamped.keys({
    datacontentencoding: Joi.string().valid('json', 'base64').insensitive(),
    datacontenttype: Joi.string().valid(''),
    id: Joi.string().required(),
    meta: Joi.object(),
    payload: Joi.object().required(),
    source: Joi.string()
      .uri({
        scheme: ['http', 'https']
      })
      .required(), // uri reference
    specversion: Joi.string().valid('0.3-wip').required(),
    time: Joi.string().regex(REGEX_RFC3339_TIMESTAMP).required(),
    type: Joi.string().required()
  })
}

export default Action
