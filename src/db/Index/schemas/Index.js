import Joi from '@hapi/joi'

const Index = {
  collectionName: 'Indexes',
  name: 'Index',
  schema: Joi.object().keys({
    value: Joi.string().required()
  })
}

export default Index
