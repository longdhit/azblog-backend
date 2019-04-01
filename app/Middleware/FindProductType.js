'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ProductType = use('App/Models/ProductType')
class FindProductType {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: { id } }, next) {
    const product_type = await ProductType.find(id)
    if (!category) {
      return response.status(404).json({
        message: 'Product type not found.',
        id
      })
    }
    request.product_type = product_type
    await next()
  }
}

module.exports = FindProductType
