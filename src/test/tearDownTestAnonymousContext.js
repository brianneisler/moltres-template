const tearDownTestAnnymousContext = async (anonymousContext) => {
  await anonymousContext.database.disableNetwork()
}

export default tearDownTestAnnymousContext
