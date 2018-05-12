import action from './action'

const config = {
  command: 'deploy',
  description: 'deploys a moltres project to firebase',
  options: {
    stage: {
      option: '-s, --stage [name]',
      description: 'Set the stage',
      default: 'dev'
    }
  },
  action
}

export default config
