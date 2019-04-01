'use strict'
const Product = use('App/Models/Product')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const products = await Post
    .query()
    .with('product_types')
    .fetch()
    response.status(200).json({
      message: 'Here are your products.',
      data: products
    })
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['name', 'description', 'image', 'price', 'discount', 'product_type_id'])
    const validation = await validateAll(data, {
      name: 'required'
    })
    if (validation.fails()) {
      return response.status(400).json({ message: validation.messages() })
    }
    const product = await Product.create(data)
    return response.status(201).json({
      message: 'Successfully created a new post.',
      data: product
    })
  }

  async show ({ params, request, response, view }) {
    const { product } = request
    const productType = await product.productType().fetch()
    // const comments = await post.comments().fetch()
    // post.comments = comments
    post.productType = productType
    response.status(200).json({
      message: 'Here is your product.',
      data: product
    })
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only(['name', 'description', 'image', 'price', 'discount', 'product_type_id'])
    const { name, description, image, price, discount, product_type_id } = data
    const { product } = request
    product.merge({ name, description, image, price, discount, product_type_id })
    await product.save()
    return response.status(200).json({
      message: 'Successfully updated this product.',
      data: product
    })
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const { product } = request
    await product.delete()
    response.status(200).json({
      message: 'Successfully deleted this product.',
      deleted: true
    })
  }
}

module.exports = ProductController
