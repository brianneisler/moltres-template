// Copyright (c) 2012-2014 Heapsource.com and Contributors - http://www.heapsource.com
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
import {
  difference,
  includes,
  isFunction,
  merge,
  omit,
  template,
  union
} from 'moltres'

const chalk = require('chalk')
const winston = require('winston')

/**
 * A default list of properties in the request object that are allowed to be logged.
 * These properties will be safely included in the meta of the log.
 * 'body' is not included in this list because it can contains passwords and stuff that are sensitive for logging.
 * TODO: Include 'body' and get the defaultRequestFilter to filter the inner properties like 'password' or 'password_confirmation', etc. Pull requests anyone?
 * @type {Array}
 */
exports.requestWhitelist = [
  'url',
  'headers',
  'method',
  'httpVersion',
  'originalUrl',
  'query'
]

/**
 * A default list of properties in the request body that are allowed to be logged.
 * This will normally be empty here, since it should be done at the route level.
 * @type {Array}
 */
exports.bodyWhitelist = []

/**
 * A default list of properties in the request body that are not allowed to be logged.
 * @type {Array}
 */
exports.bodyBlacklist = []

/**
 * A default list of properties in the response object that are allowed to be logged.
 * These properties will be safely included in the meta of the log.
 * @type {Array}
 */
exports.responseWhitelist = ['statusCode']

/**
 * A list of request routes that will be skipped instead of being logged. This would be useful if routes for health checks or pings would otherwise pollute
 * your log files.
 * @type {Array}
 */
exports.ignoredRoutes = []

/**
 * A default function to filter the properties of the req object.
 * @param req
 * @param propName
 * @return {*}
 */
exports.defaultRequestFilter = function (req, propName) {
  return req[propName]
}

/**
 * A default function to filter the properties of the res object.
 * @param res
 * @param propName
 * @return {*}
 */
exports.defaultResponseFilter = function (res, propName) {
  return res[propName]
}

/**
 * A default function to decide whether skip logging of particular request. Doesn't skip anything (i.e. log all requests).
 * @return always false
 */
exports.defaultSkip = function () {
  return false
}

function ensureValidOptions(options) {
  if (!options) {
    throw new Error('options are required by express-winston middleware')
  }
  if (
    !(
      (options.transports && options.transports.length > 0) ||
      options.winstonInstance
    )
  ) {
    throw new Error(
      'transports or a winstonInstance are required by express-winston middleware'
    )
  }

  if (options.dynamicMeta && !isFunction(options.dynamicMeta)) {
    throw new Error('`dynamicMeta` express-winston option should be a function')
  }
}

function filterObject(originalObj, whiteList, initialFilter) {
  const obj = {}
  let fieldsSet = false

  ;[].concat(whiteList).forEach(function (propName) {
    const value = initialFilter(originalObj, propName)

    if (typeof value !== 'undefined') {
      obj[propName] = value
      fieldsSet = true
    }
  })

  return fieldsSet ? obj : undefined
}

function getRequestTemplate(loggerOptions, templateOptions) {
  if (loggerOptions.expressFormat) {
    let expressMsgFormat = 'REQUEST {{req.method}} {{req.url}}'
    if (loggerOptions.colorize) {
      expressMsgFormat = chalk.grey('REQUEST {{req.method}} {{req.url}}')
    }

    return template(expressMsgFormat, templateOptions)
  }

  if (!isFunction(loggerOptions.requestMessage)) {
    return template(loggerOptions.requestMessage, templateOptions)
  }

  return function (data) {
    data = data || {}
    const message = loggerOptions.requestMessage(data.req, data.res)

    // if there is no interpolation, don't waste resources creating a template.
    // this quick regex is still way faster than just blindly compiling a new template.
    if (!/\{\{/.test(message)) {
      return message
    }
    // since options.requestMessage was a function, and the results seem to contain moustache
    // interpolation, we'll compile a new template for each request.
    // Warning: this eats a ton of memory under heavy load.
    return template(message, templateOptions)(data)
  }
}

function getResponseTemplate(loggerOptions, templateOptions) {
  if (loggerOptions.expressFormat) {
    let expressMsgFormat =
      'RESPONSE {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms'
    if (loggerOptions.colorize) {
      expressMsgFormat =
        chalk.grey('RESPONSE {{req.method}} {{req.url}}') +
        ' {{res.statusCode}} ' +
        chalk.grey('{{res.responseTime}}ms')
    }

    return template(expressMsgFormat, templateOptions)
  }

  if (!isFunction(loggerOptions.responseMessage)) {
    return template(loggerOptions.responseMessage, templateOptions)
  }

  return function (data) {
    data = data || {}
    const message = loggerOptions.responseMessage(data.req, data.res)

    // if there is no interpolation, don't waste resources creating a template.
    // this quick regex is still way faster than just blindly compiling a new template.
    if (!/\{\{/.test(message)) {
      return message
    }
    // since options.responseMessage was a function, and the results seem to contain moustache
    // interpolation, we'll compile a new template for each request.
    // Warning: this eats a ton of memory under heavy load.
    return template(message, templateOptions)(data)
  }
}

function getErrorTemplate(loggerOptions, templateOptions) {
  if (loggerOptions.expressFormat) {
    let expressMsgFormat =
      'ERROR {{req.method}} {{req.url}}\n' +
      '{{err.stack}}\n' +
      'Caused By:{{err.causes}}\n'
    if (loggerOptions.colorize) {
      expressMsgFormat =
        chalk.red('ERROR {{req.method}} {{req.url}}\n') +
        chalk.grey('{{err.stack}}\n' + 'Caused By:{{err.causes}}\n')
    }

    return template(expressMsgFormat, templateOptions)
  }

  if (!isFunction(loggerOptions.errorMessage)) {
    return template(loggerOptions.errorMessage, templateOptions)
  }

  return function (data) {
    data = data || {}
    const message = loggerOptions.errorMessage(data.req, data.res)

    // if there is no interpolation, don't waste resources creating a template.
    // this quick regex is still way faster than just blindly compiling a new template.
    if (!/\{\{/.test(message)) {
      return message
    }
    // since options.errorMessage was a function, and the results seem to contain moustache
    // interpolation, we'll compile a new template for each request.
    // Warning: this eats a ton of memory under heavy load.
    return template(message, templateOptions)(data)
  }
}

//
// ### function errorLogger(options)
// #### @options {Object} options to initialize the middleware.
//

const errorLogger = function errorLogger(options) {
  ensureValidOptions(options)

  options.requestWhitelist =
    options.requestWhitelist || exports.requestWhitelist
  options.requestFilter = options.requestFilter || exports.defaultRequestFilter
  options.winstonInstance =
    options.winstonInstance ||
    winston.createLogger({
      format: options.format,
      transports: options.transports
    })
  options.baseMeta = options.baseMeta || {}
  options.metaField = options.metaField || null
  options.level = options.level || 'error'
  options.dynamicMeta =
    options.dynamicMeta ||
    function () {
      return null
    }
  const exceptionHandler = new winston.ExceptionHandler(options.winstonInstance)
  options.exceptionToMeta =
    options.exceptionToMeta ||
    exceptionHandler.getAllInfo.bind(exceptionHandler)
  options.blacklistedMetaFields = options.blacklistedMetaFields || []
  options.skip = options.skip || exports.defaultSkip

  // Using mustache style templating
  const errorTemplate = getErrorTemplate(options, {
    interpolate: /\{\{([\s\S]+?)\}\}/g
  })

  return function (err, req, res, next) {
    // Let winston gather all the error data
    let exceptionMeta = omit(
      options.exceptionToMeta(err),
      options.blacklistedMetaFields
    )
    exceptionMeta.req = filterObject(
      req,
      options.requestWhitelist,
      options.requestFilter
    )

    if (options.dynamicMeta) {
      const dynamicMeta = options.dynamicMeta(req, res, err)
      exceptionMeta = merge(exceptionMeta, dynamicMeta)
    }

    if (options.metaField) {
      const newMeta = {}
      newMeta[options.metaField] = exceptionMeta
      exceptionMeta = newMeta
    }

    exceptionMeta = merge(exceptionMeta, options.baseMeta)

    const level = isFunction(options.level)
      ? options.level(req, res, err)
      : options.level

    if (!options.skip(req, res, err)) {
      // This is fire and forget, we don't want logging to hold up the request so don't wait for the callback
      options.winstonInstance.log({
        level,
        message: errorTemplate({ err, req, res }),
        meta: exceptionMeta
      })
    }

    next(err)
  }
}

function levelFromStatus(options) {
  return function (req, res) {
    let level = ''
    if (res.statusCode >= 100) {
      level = options.statusLevels.success || 'info'
    }
    if (res.statusCode >= 400) {
      level = options.statusLevels.warn || 'warn'
    }
    if (res.statusCode >= 500) {
      level = options.statusLevels.error || 'error'
    }
    return level
  }
}

function safeJSONParse(string) {
  try {
    return JSON.parse(string)
  } catch (e) {
    return undefined
  }
}

function bodyToString(body, isJSON) {
  const stringBody = body && body.toString()
  if (isJSON) {
    return safeJSONParse(body) || stringBody
  }
  return stringBody
}

function ensureValidLoggerOptions(options) {
  if (options.ignoreRoute && !isFunction(options.ignoreRoute)) {
    throw new Error('`ignoreRoute` express-winston option should be a function')
  }
}

//
// ### function logger(options)
// #### @options {Object} options to initialize the middleware.
//
const logger = function logger(options) {
  ensureValidOptions(options)
  ensureValidLoggerOptions(options)

  options.requestWhitelist =
    options.requestWhitelist || exports.requestWhitelist
  options.bodyWhitelist = options.bodyWhitelist || exports.bodyWhitelist
  options.bodyBlacklist = options.bodyBlacklist || exports.bodyBlacklist
  options.responseWhitelist =
    options.responseWhitelist || exports.responseWhitelist
  options.requestFilter = options.requestFilter || exports.defaultRequestFilter
  options.responseFilter =
    options.responseFilter || exports.defaultResponseFilter
  options.ignoredRoutes = options.ignoredRoutes || exports.ignoredRoutes
  options.winstonInstance =
    options.winstonInstance ||
    winston.createLogger({
      format: options.format,
      transports: options.transports
    })
  options.statusLevels = options.statusLevels || false
  options.level = options.statusLevels
    ? levelFromStatus(options)
    : options.level || 'info'
  options.requestMessage =
    options.requestMessage || 'HTTP {{req.method}} {{req.url}}'
  options.responseMessage = options.baseMeta = options.baseMeta || {}
  options.metaField = options.metaField || null
  options.colorize = options.colorize || false
  options.expressFormat = options.expressFormat || false
  options.ignoreRoute =
    options.ignoreRoute ||
    function () {
      return false
    }
  options.skip = options.skip || exports.defaultSkip
  options.dynamicMeta =
    options.dynamicMeta ||
    function () {
      return null
    }

  // Using mustache style templating
  const requestTemplate = getRequestTemplate(options, {
    interpolate: /\{\{(.+?)\}\}/g
  })

  const responseTemplate = getResponseTemplate(options, {
    interpolate: /\{\{(.+?)\}\}/g
  })

  return function (req, res, next) {
    const coloredRes = {}

    const currentUrl = req.originalUrl || req.url
    if (currentUrl && includes(options.ignoredRoutes, currentUrl)) {
      return next()
    }
    if (options.ignoreRoute(req, res)) {
      return next()
    }
    req._startTime = new Date()

    const requestMessage = requestTemplate({ req })

    // This is fire and forget, we don't want logging to hold up the request so don't wait for the callback
    if (!options.skip(req)) {
      const level = isFunction(options.level)
        ? options.level(req)
        : options.level
      options.winstonInstance.log({ level, message: requestMessage })
    }

    req._routeWhitelists = {
      body: [],
      req: [],
      res: []
    }

    req._routeBlacklists = {
      body: []
    }

    // Manage to get information from the response too, just like Connect.logger does:
    const { end } = res
    res.end = function (chunk, encoding) {
      res.responseTime = new Date() - req._startTime

      res.end = end
      res.end(chunk, encoding)

      req.url = req.originalUrl || req.url

      let meta = {}

      if (options.meta !== false) {
        let logData = {}

        const requestWhitelist = options.requestWhitelist.concat(
          req._routeWhitelists.req || []
        )
        const responseWhitelist = options.responseWhitelist.concat(
          req._routeWhitelists.res || []
        )

        logData.res = res

        if (includes(responseWhitelist, 'body')) {
          if (chunk) {
            const isJson =
              res.getHeader('content-type') &&
              res.getHeader('content-type').indexOf('json') >= 0

            logData.res.body = bodyToString(chunk, isJson)
          }
        }

        logData.req = filterObject(req, requestWhitelist, options.requestFilter)
        logData.res = filterObject(
          res,
          responseWhitelist,
          options.responseFilter
        )

        const bodyWhitelist = union(
          options.bodyWhitelist,
          req._routeWhitelists.body || []
        )
        const blacklist = union(
          options.bodyBlacklist,
          req._routeBlacklists.body || []
        )

        let filteredBody = null

        if (req.body !== undefined) {
          if (blacklist.length > 0 && bodyWhitelist.length === 0) {
            const whitelist = difference(Object.keys(req.body), blacklist)
            filteredBody = filterObject(
              req.body,
              whitelist,
              options.requestFilter
            )
          } else if (
            requestWhitelist.indexOf('body') !== -1 &&
            bodyWhitelist.length === 0 &&
            blacklist.length === 0
          ) {
            filteredBody = filterObject(
              req.body,
              Object.keys(req.body),
              options.requestFilter
            )
          } else {
            filteredBody = filterObject(
              req.body,
              bodyWhitelist,
              options.requestFilter
            )
          }
        }

        if (logData.req) {
          if (filteredBody) {
            logData.req.body = filteredBody
          } else {
            delete logData.req.body
          }
        }

        logData.responseTime = res.responseTime

        if (options.dynamicMeta) {
          const dynamicMeta = options.dynamicMeta(req, res)
          logData = merge(logData, dynamicMeta)
        }

        if (options.metaField) {
          const newMeta = {}
          newMeta[options.metaField] = logData
          logData = newMeta
        }
        meta = merge(meta, logData)
      }

      meta = merge(meta, options.baseMeta)

      if (options.colorize) {
        // Palette from https://github.com/expressjs/morgan/blob/master/index.js#L205
        let statusColor = 'green'
        if (res.statusCode >= 500) {
          statusColor = 'red'
        } else if (res.statusCode >= 400) {
          statusColor = 'yellow'
        } else if (res.statusCode >= 300) {
          statusColor = 'cyan'
        }

        coloredRes.statusCode = chalk[statusColor](res.statusCode)
      }

      const responseMessage = responseTemplate({
        req,
        res: merge({}, res, coloredRes)
      })

      // This is fire and forget, we don't want logging to hold up the request so don't wait for the callback
      if (!options.skip(req, res)) {
        const level = isFunction(options.level)
          ? options.level(req, res)
          : options.level
        options.winstonInstance.log({ level, message: responseMessage, meta })
      }
    }

    next()
  }
}

export { errorLogger, logger }
