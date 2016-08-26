// export function* context(options) {
//   const contextChain = this.contextController.generateContextChain()
//   this.contextController.establishPackTypeContext(contextChain, {
//     packType: this.packType
//   })
//   this.contextController.establishExecContext(contextChain, options)
//   const configChain = await this.configController.loadConfigChain(contextChain)
//   this.contextController.establishFirebaseContext(contextChain, {
//     firebaseUrl: configChain.getProperty('firebaseUrl')
//   })
//   await this.authController.auth(contextChain)
//   return contextChain
// }
