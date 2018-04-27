import loadWelcome from './loadWelcome'

const printWelcome = async (cli) => {
  const welcome = await loadWelcome()
  cli.log(welcome)
}

export default printWelcome
