const createCustomToken = async ({ auth }, uid, claims) =>
  auth.createCustomToken(uid, claims)

export default createCustomToken
