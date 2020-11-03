TODO

- [ ] Add auto event enrichment. This should be done by examining the schema and
  loading any properties on it that need to be retrieved from the db

```
import { Action } from '../../action'
import { Object, String } from '../../core'

import Event from './Event'

const ProcessEventAction = {
  name: 'event.ProcessEventAction',
  schema: Action.schema.keys({
    payload: Object.schema.keys({
      // This should be auto loaded...
      event: Event.schema,
      eventId: String.schema.required()
    })
  })
}

export default ProcessEventAction
```

- [ ] upgrade to node 12
- [ ] Setup vscode debugging for when code is running locally on emulators

- [ ] add new DB concepts to firestore.rules
  - App
  - File
  - [x] Host
  - Page
  - PageContent
  - [x] Url
- [x] rename service folder to `sdk`
- [ ] move all queryAndWatch and db enhancer functions into `sdk` folders within
  modules
- [ ] complete sdk implementation

- [ ] Add a styles system that picks up styles from theme
  - should also allow for a feature similar to "class names" for overriding styles
- [ ] Add a styles section to theme


- [ ] IMPROVEMENT: setup webpack dev server that runs independently of the functions

- [ ] add app concept  
  - move expo config to app folder and specify which one to use
  https://forums.expo.io/t/building-with-alternate-app-json-files/10690/4
  - each app should have a folder in the `apps` folder based on slug name
  - each app should have a `theme` folder in it
  - need a way to add the App entry to the db. How is this done?
    - add app command line utility
  - how do we map URLs to the specific App instance?

- [ ] add Theme concept
  - theme should have a json file to define it with the following values
```js
{
  name: 'my-theme',
  color: '#4A90E2',
  icons:
}
```
  - theme folder should have a `public` folder
  - public folder should be served by express as a static folder
  - caching should be added to items in public folder




- [ ] add module for browserconfig 
  - use xmlbuilder2 to generate xml file https://github.com/oozcitak/xmlbuilder2
  - add path to express app to serve browserconfig.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/assets/icons/rubber-duck-icon-70x70.png"/>
      <square150x150logo src="/assets/icons/rubber-duck-icon-270x270.png"/>
      <square310x310logo src="/assets/icons/rubber-duck-icon-310x310.png"/>
      <!-- <wide310x150logo src="./assets/mstile-310x150.png"/> -->
      <TileColor>#4A90E2</TileColor>
    </tile>
  </msapplication>
</browserconfig>
```
  - TileColor should come from `Theme.color`
  - Icons should come from `Theme.icons`


- [ ] IMPROVEMENT: Switch CI to Google Cloud Build instead of Semaphore
  https://cloud.google.com/cloud-build/docs/automating-builds/create-github-app-triggers
- [ ] FEATURE: create an install system that authenticates through Google and
  github during setup 
  - it should enable all necessary google APIs
  - it should setup initial configuration and environments
  - it should setup the firebase project
  - it should setup all github triggers and hooks for establishing CI deployment
  
- [ ] add deployment of infrastructure 

- [ ] setup server side functions to use webpack so we can make use of code
  branching


- [ ] collapse all modules down into a single folder. Use webpack to generate
  correct module code for each target.
