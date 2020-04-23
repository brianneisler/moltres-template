const tearDownTestAnnymousContext = async (anonymousContext) => {
  await anonymousContext.app.delete()
}

export default tearDownTestAnnymousContext
