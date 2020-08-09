const tearDownCliContexts = async ({ adminContext, context }) => {
  await Promise.all([
    adminContext.database.disableNetwork(),
    context.database.disableNetwork()
  ])
}

export default tearDownCliContexts
