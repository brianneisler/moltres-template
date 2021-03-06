# moltres

Your application!

This application is built on the
[moltres](https://github.com/brianneisler/moltres) application framework.

An app built using moltres is a full fledged mobile app (iOS and Android) as well as web app.


## Project Status

[![license](https://img.shields.io/npm/l/moltres.svg)](https://www.npmjs.com/package/moltres)
[![build status](https://brianneisler.semaphoreci.com/badges/moltres-template.svg?style=shields)](https://brianneisler.semaphoreci.com/projects/moltres-template)
[![codecov](https://codecov.io/gh/brianneisler/moltres-template/branch/master/graph/badge.svg)](https://codecov.io/gh/brianneisler/moltres-template)<br/>


## Getting Started

Setup your firebase application on https://firebase.google.com/

### Creating a new application
* Create a new repository on github using this repo as the template.
* Modify the application name in `package.json`
* Follow the steps in [DEVELOPMENT.md](./DEVELOPMENT.md) to get your application
  running.

### Updating your application with changes from template
* Add this repo as a remote to your repo
```
git remote add template https://github.com/brianneisler/moltres-template.git
```
* Then fecth master from template
```
git fetch template master
```
* checkout a new branch in your project 
```
git checkout -b updates-from-template
```
* merge template master and allow for different hostories
```
git merge template/master --allow-unrelated-histories
```
* Now you can either open a PR for these updates by pushing this branch remotely
  and opening a PR on github 

* OR you can merge your branch into master
```
git checkout master
git merge updates-from-template
```
