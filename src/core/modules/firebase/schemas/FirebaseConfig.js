import { Domain, Email, Integer, Object, String, Url } from '../../core/schemas'

const FirebaseConfig = {
  schema: Object.schema
    .keys({
      apiKey: String.schema.required(),
      appId: String.schema,
      authDomain: Domain.schema.required(),
      databaseURL: Url.schema.required(),
      measurementId: String.schema,
      messagingSenderId: Integer.schema.required(),
      projectId: String.schema.required(),
      serviceAccount: Object.schema
        .keys({
          auth_provider_x509_cert_url: Url.schema.required(),
          auth_uri: Url.schema.required(),
          client_email: Email.schema.required(),
          client_id: String.schema.required(),
          client_x509_cert_url: Url.schema.required(),
          private_key: String.schema.required(),
          private_key_id: String.schema.required(),
          project_id: String.schema.required(),
          token_uri: Url.schema.required(),
          type: String.schema.required()
        })
        .required(),
      storageBucket: Domain.schema.required(),
      token: String.schema.required()
    })
    .required()
}

export default FirebaseConfig
