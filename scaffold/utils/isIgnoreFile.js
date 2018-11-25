const { basename } = require('path')

const IGNORE_REGEX = /^\.[a-zA-Z]+ignore$/

const isIgnoreFile = (path) => IGNORE_REGEX.test(basename(path))

module.exports = isIgnoreFile
