const getStage = () => {
  let stage = process.env.STAGE
  if (!stage) {
    stage = 'dev'
  }
  return stage
}
