const tearDownTestServiceAccountContext = async (testContext) => {
  await testContext.database.disableNetwork()
}

export default tearDownTestServiceAccountContext
