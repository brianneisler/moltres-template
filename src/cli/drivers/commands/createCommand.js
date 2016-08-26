export function createCommand(type, handler) {
  return {
    handler,
    type
  }
}
