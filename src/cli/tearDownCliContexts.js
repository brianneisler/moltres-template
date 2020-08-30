const tearDownCliContexts = async ({ adminContext, context }) => {
  await Promise.all([adminContext.app.delete(), context.app.delete()])
}

export default tearDownCliContexts
