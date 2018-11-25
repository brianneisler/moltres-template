# Development

This doc outlines how to develop the moltres projects themselves.

# Requirements

* node.js 8.0+
* npm 5.0+

*NOTE:* we recommend using home brew and nvm
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

To watch moltres and test on every file change

```sh
npm run watch:test
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


## Version

(WARNING: this does not bump dependencies. That currently has to be done manually)

To bump the major version of all projects and modules

```sh
npm run version:major
```

To bump the minor version of all projects and modules

```sh
npm run version:minor
```

To bump the patch version of all projects and modules

```sh
npm run version:patch
```

## Update an existing project

This updates the project's dependencies based on what is contained in the project's scaffold configuration.

```sh
npm run update
```
