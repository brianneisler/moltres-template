import loadWelcome from './loadWelcome'

const printWelcome = async (logger) => {
  const welcome = await loadWelcome()
  logger.log(welcome)
}

export default printWelcome
