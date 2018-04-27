import 'babel-polyfill'
import * as plugins from './plugins'
import { createCli, createContext, loadApp } from './util'

const start = async () => {
  let context = createContext({ plugins })
  const app = loadApp(context)
  context = {
    ...context,
    app
  }
  const cli = createCli(context)
  try {
    await cli.start()
    if (!cli.isInteractive) {
      process.exit(0)
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default start
