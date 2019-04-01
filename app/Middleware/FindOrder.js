'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Order = use('App/Models/Order')
class FindOrder {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: { id } }, next) {
    // call next to advance the request
    const order = await Order.find(id)
    if (!order) {
      return response.status(404).json({
        message: 'Order not found.',
        id
      })
    }
    request.order = order

    await next()
  }
}

module.exports = FindOrder
