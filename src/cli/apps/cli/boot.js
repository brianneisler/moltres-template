export default ({ engine, module }) => {
  const { blueprint } = module
  engine.factory(blueprint)
}
