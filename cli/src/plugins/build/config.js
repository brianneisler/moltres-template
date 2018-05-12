import action from './action'

const config = {
  command: 'build',
  description: 'builds a moltres project',
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
