'use strict'
const Category = use('App/Models/Category')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindCategory {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: { id } }, next) {
    const category = await Category.find(id)
    if (!category) {
      return response.status(404).json({
        message: 'Category not found.',
        id
      })
    }
    request.category = category
    await next()
  }
}

module.exports = FindCategory
