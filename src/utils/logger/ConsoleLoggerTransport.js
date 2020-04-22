import Transport from 'winston-transport'

class ConsoleLoggerTransport extends Transport {
  constructor(options = {}) {
    super({
      ...options,
      level: options.level || 'info',
      name: 'ConsoleLoggerTransport'
    })
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info)
    })

    const { code, level, name, /* timestamp,*/ ...meta } = info
    const message = info.message || meta[Symbol.for('message')]
    let parts = [`${level}(${code || name}): ${message}`]

    const actualLevel = meta[Symbol.for('level')]
    const splat = meta[Symbol.for('splat')]
    if (splat) {
      parts = parts.concat([splat])
    }
    switch (actualLevel) {
      case 'verbose':
      case 'debug':
        // eslint-disable-next-line no-console
        console.debug(...parts)
        break
      case 'notice':
      case 'info':
        // eslint-disable-next-line no-console
        console.info(...parts)
        break
      case 'warn':
      case 'warning':
        // eslint-disable-next-line no-console
        console.warn(...parts)
        break
      case 'error':
      case 'crit':
      case 'alert':
      case 'emerg':
        if (meta && meta.meta && meta.meta.error) {
          parts = parts.concat([meta.meta.error])
        }
        // eslint-disable-next-line no-console
        console.error(...parts)
        break
      default:
        // eslint-disable-next-line no-console
        console.log(...parts)
    }
    callback(null, true)
  }
}

export default ConsoleLoggerTransport
