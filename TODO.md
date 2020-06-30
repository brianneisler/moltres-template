TODO

- [ ] add new DB concepts to firestore.rules
  - App
  - File
  - Host
  - Page
  - PageContent
  - Url
- [ ] rename service folder to `sdk`
- [ ] move all queryAndWatch and db enhancer functions into `sdk` folder



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
  