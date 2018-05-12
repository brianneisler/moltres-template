# Development

# Requirements

* node.js 8.0+
* npm 5.0+

*NOTE:* we recommend using nvm
```sh
brew install nvm
nvm install 8
nvm use 8
```

## Setup

To install all dependencies and do an initial build of all source files

```sh
git clone https://github.com/brianneisler/moltres.git
cd moltres
npm run setup
```


## Build

To build moltres

```sh
npm run build
```


## Clean

To clean moltres

```sh
npm run clean
```


## Cleanse

To clean as well as cleanse moltres of all package-lock.json file and node_modules folders

```sh
npm run cleanse
```


## Watch

To watch moltres and build on every file change

```sh
npm run watch:build
```


## Lint

To lint the moltres project

```sh
npm run lint
```


## Test

To run tests against moltres

```sh
npm test
```
