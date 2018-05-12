import { isEmpty, isNil, prop } from 'ramda'

const getStage = (options) => {
  let stage = prop('stage', options) || process.env.MOLTRES_STAGE
  if (isNil(stage) || isEmpty(stage)) {
    stage = 'dev'
  }
  return stage
}

export default getStage
