import action from './action'

const config = {
  command: 'test',
  description: 'runs tests on a moltres project',
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
