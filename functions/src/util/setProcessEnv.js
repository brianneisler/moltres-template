const setProcessEnv = (envs) => {
  process.env = {
    ...process.env,
    ...envs
  }
}

export default setProcessEnv
