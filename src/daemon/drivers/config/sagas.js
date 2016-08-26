// function* handleConfigDelete(action) {
//   const { key, options } = action.payload
//   try {
//     options = refineTargetOption(options, 'project')
//     const results = await GulpRecipe.configDelete(key, options)
//     results.forEach((result) => {
//         if (!result.exists) {
//             console.log('config: no config found for context "' + result.context + '"')
//             return
//         }
//         if (result.deleted) {
//             console.log('config: value deleted for key:\'' + result.key + '\' value:\'' + result.value + '\'')
//         } else {
//             console.log('config: no value found for key:\'' + result.key + '\'')
//         }
//     })
//   } catch(error) {
//     console.log('Config delete failed')
//     console.log(error)
//     throw error
//   }
// }
//
//
// import { defineOptions } from '../options'
//
// export function* configDelete(key, options) {
//   options = defineOptions(options, {
//     target: 'project'
//   })
//   const contextChain = await this.context(options)
//   return await this.configController.deleteConfigProperty(contextChain, key)
// }
//
//
// export function* configGet(key, options) {
//   options = this.defineOptions(options, {
//     target: 'project'
//   })
//   const contextChain = await this.context(options)
//   return await this.configController.getConfigProperty(contextChain, key)
// }
// 
//     /**
//      * @param {string} key
//      * @param {*} value
//      * @param {{
//      *      target: string=
//      * }=} options
//      */
//     async configSet(key, value, options) {
//         options = this.defineOptions(options, {
//             target: 'project'
//         })
//         const contextChain = await this.context(options)
//         return await this.configController.setConfigProperty(contextChain, key, value)
//     },
