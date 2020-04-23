const tearDownTestServiceAccountContext = async (testContext) => {
  await testContext.app.delete()
}

export default tearDownTestServiceAccountContext
