import 'raf/polyfill'
import { setupSSRApp } from './ssr'

Error.stackTraceLimit = Infinity

export default setupSSRApp()
