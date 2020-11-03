import { String, Timestamped } from '../../core'

const REGEX_RFC3339_TIMESTAMP = /^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])[Tt]([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(([Zz])|([\+|\-]([01][0-9]|2[0-3]):[0-5][0-9]))$/

const Event = {
  collectionName: 'Events',
  idField: 'id',
  name: 'Event',
  schema: Timestamped.schema.keys({
    data: String.schema.allow(null).required(),
    datacontenttype: String.schema.allow('').required(),
    id: String.schema.required(),
    source: String.schema
      .uri({
        scheme: ['http', 'https']
      })
      .required(),
    specversion: String.schema.valid('1.0').required(),
    subject: String.schema.allow(null).required(),
    time: String.schema.regex(REGEX_RFC3339_TIMESTAMP).required(),
    type: String.schema.required()
  })
}

export default Event
