const verifyIdToken = async ({ auth }, idToken) => auth.verifyIdToken(idToken)

export default verifyIdToken
