const signInWithIdToken = async ({ auth }, idToken) =>
  auth.signInWithCustomToken(idToken)

export default signInWithIdToken
