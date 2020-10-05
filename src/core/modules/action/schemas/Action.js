import Object from '../../core/schemas/Object'
import String from '../../core/schemas/String'
import Timestamped from '../../core/schemas/Timestamped'

const REGEX_RFC3339_TIMESTAMP = /^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])[Tt]([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(([Zz])|([\+|\-]([01][0-9]|2[0-3]):[0-5][0-9]))$/

// Based on cloudevents spec https://github.com/cloudevents/spec/blob/master/spec.md
const Action = {
  collectionName: 'Actions',
  name: 'Action',
  schema: Timestamped.schema.keys({
    datacontentencoding: String.schema.valid('json', 'base64').insensitive(),
    datacontenttype: String.schema.valid(''),
    id: String.schema.required(),
    meta: Object.schema,
    payload: Object.schema.allow(null).required(),
    source: String.schema
      .uri({
        scheme: ['http', 'https']
      })
      .required(), // uri reference
    specversion: String.schema.valid('0.3-wip').required(),
    time: String.schema.regex(REGEX_RFC3339_TIMESTAMP).required(),
    type: String.schema.required()
  })
}

export default Action
