'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Logging {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    const requestStart = process.hrtime()
    response.response.on('finish', () => {
      const [sec, nanosec] = process.hrtime(requestStart)
      const responseTime = (sec * 1e9 + nanosec) / 1000000

      console.log('%s(%s) request on %s url -> %s',
        request.method(),
        response.response.statusCode,
        request.url(),
        `${responseTime} ms`
      )
    })
    await next()
  }
}

module.exports = Logging
