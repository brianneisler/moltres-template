import boot from './boot'
import init from './init'
const blueprint = require('./blueprint.json')
const info = require('./app.json')

export { default } from './MessagesExtension'
export {
  blueprint,
  boot,
  info,
  init
}
