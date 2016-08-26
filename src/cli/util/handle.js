export default function handle(mappedHandlers) {
  return function* (action) {
    const { type } = action
    const handler = mappedHandlers[type]
    yield* handler(action)
  }
}
