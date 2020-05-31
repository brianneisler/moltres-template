const mod = {
  routes: [
    {
      exact: true,
      handle: () => ({ statusCode: 200 }),
      path: '/legal/privacy'
    },
    {
      exact: true,
      handle: () => ({ statusCode: 200 }),
      path: '/legal/terms'
    },
    {
      exact: true,
      handle: () => ({
        redirect: '/legal/terms',
        statusCode: 301
      }),
      path: '/legal'
    }
  ]
}

export default mod
