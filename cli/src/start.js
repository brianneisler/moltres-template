import { createContext } from 'moltres-tools'
import { createCli } from './util'

const start = async () => {
  const context = await createContext()
  const cli = createCli(context)
  try {
    await cli.start()
    if (!cli.isInteractive) {
      console.log('process exiting')
      process.exit(0)
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default start
