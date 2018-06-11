import { config } from 'moltres'

const setupConfig = () => config({
  ...process.env
})

export default setupConfig
