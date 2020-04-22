# Development 

This doc outlings how to develope this project including installing, getting
started and available commands to run.


## PRE-REQS

* You must have node 10 or higher installed


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

* create your `.env-local` file in the root of the project
```
API_URL="http://localhost:5000/api/v1"

BLUEBIRD_DEBUG=true

FIRESTORE_EMULATOR_HOST=localhost:8080
#TEST_INTEGRATION=true

TWILIO_ACCOUNT_SID=[twillio account sid from dev environment]
TWILIO_AUTH_TOKEN=[twilio auth token from dev environment]

SITE_NAME="APP LOCAL"
SITE_URL="http://localhost:5000"
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
