const buildProps = (selectedProps, propBuilders) =>
  propBuilders.map((builder) => builder(...selectedProps))

export default buildProps
