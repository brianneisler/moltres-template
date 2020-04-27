// NOTE BRN: Firebase functions don't have a way of setting the entry point file
// other than in package.json. Since this same entry point is used by the app
// implementations we need to leave the main bootstrap.js file for the functions
// implementation and the others can use their implementation specific
// extenstions ".web.js", ".ssr.js", ".ios.js", ".android.js"
require('firebase-functions')

if (process.env.NODE_ENV !== 'production') {
  require('@babel/register')(require('./babel.config'))
  module.exports = require('./src/index.functions')
} else {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
  module.exports = require('./dist/index.functions')
}
