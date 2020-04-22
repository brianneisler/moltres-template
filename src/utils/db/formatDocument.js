const formatDocument = (document, options = {}) => {
  if (!document || !document.exists) {
    return null
  }
  const data = document.data()
  if (!options.includeRemoved && data.removedAt) {
    return null
  }
  return {
    id: document.id,
    ...data
  }
}

export default formatDocument
