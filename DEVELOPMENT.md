# Development 

This doc outlings how to develope this project including installing, getting
started and available commands to run.


## PRE-REQS

* You must have nvm installed
```
brew install nvm
```

## INSTALL

* install the firebase-tools
```
npm i -g firebase-tools
```
* add the firebase apps you will be deploying. Alias them to `prod`, `test` and `local`
```
firebase use --add 
``` 
* install glcoud tools
brew cask install google-cloud-sdk


* login with firebase tools
```
firebase login
```

* login to gcloud
```
gcloud auth login
```

## SETUP LOCAL
* these steps let you define and setup your local development environment

* create your `stages/local/.env` file in the root of the project. Set this as
  the contents of that file.
```
BLUEBIRD_DEBUG=true

FIREBASE_PROJECT_ID="${config.firebase.projectId}"
FIREBASE_TOKEN="${config.firebase.token}"

NODE_ENV=development
```
* create your `stages/local/config.yaml` file in the root of the project. Set
  this as the contents of that file.
```
api:
  url: "http://localhost:5000/api/v1"

app:
  description: "Moltres local app"
  name: "Moltres Local"
  slug: "moltres-local"
  theme: "moltres"
  url: "http://localhost:5000"

core:
  debug: true

# facebook:
#   appId: TODO

firebase:
  apiKey: "your firebase api key"
  # appId: TODO
  authDomain: "${this.firebase.projectId}.firebaseapp.com"
  databaseURL: "https://${this.firebase.projectId}.firebaseio.com"
  # measurementId: TODO
  messagingSenderId: your firebase messaging sender id
  projectId: "your firebase project id"
  serviceAccount:
    sensitive: true
    value:
      auth_provider_x509_cert_url: https://www.googleapis.com/oauth2/v1/certs
      auth_uri: https://accounts.google.com/o/oauth2/auth
      client_email: "your firebase client email"
      client_id: "your firebase client id"
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(this.firebase.serviceAccount.client_email)}"
      private_key: "your firebase private key"
      private_key_id: "your firbease private key id"
      project_id: ${this.firebase.projectId}
      token_uri: https://accounts.google.com/o/oauth2/token
      type: 'service_account'
  storageBucket: "${this.firebase.projectId}.appspot.com"
  token:
    sensitive: true
    value: "your firebase token"

# firestore:
#   backupBucket: TODO

# google_analytics:
#   analyticsId: TODO

# sentry:
#   dsn: TODO

ssr:
  outputPath: "${project.dir}/private/dist"

# test:
#   integration: ${env.TEST_INTEGRATION}

twilio:
  sensitive: true
  value:
    accountSid: "your twillio sid"
    authToken: "your twilio auth token"
    phoneNumbers:
      - "your twilio phone number"

# twitter:
#   username: TODO

```

* Run setup script
```
npm run setup
```


## Development Scripts

In the project directory, you can run:

### `npm start [stage]`

Runs the app in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.


### `STAGE=[stage] npm run test`

Starts tests against a specific stage

### Running local tests against firestore emulator
```
npm run test
```

.env-local
```
#TEST_INTEGRATION=true
FIRESTORE_EMULATOR_HOST=localhost:8080
```

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


### `npm run clean`

Cleans up the artifacts created by `npm run build`. This is useful if you want
to ensure that your code is built from scratch and no residual artifacts remain.


### `npm run deploy`

Deploys your application 


## Database Scripts

### `npm run database:backup [stage]`

Back up a database with the given `stage` name

### `npm run database:delete [stage]`

Delete the database for the given `stage`. **WARNING** This deletes the entire database!

### `npm run database:deploy [stage]`

Deploy the database rules and run migrations for the given `stage` name

### `npm run migrate:up [stage]`

Migrate the database up to the latest version for the given `stage` name

### `npm run database:migration:create [name-of-script]`

Creates a new database migration script from a starter template and places it
into the `./migrations` folder.

### `npm run database:predeploy [stage]`

This runs the predeploy steps such as minifying the database rules for the given `stage`

### `npm run database:restore [stage] [backup-id]`

Restores the database on the given `stage` to the backup id stored in the backup
bucket defined in the .env file for the stage ``

## DEBUG

Debugging query factories

Add this code before or after in the query composition.
```js
(next) => {
  return (props, ...rest) => {
    console.log('props:', props)
    debugger
    return next(props, ...rest)
  }
}
```
