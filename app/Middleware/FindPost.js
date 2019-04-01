'use strict'
const Post = use('App/Models/Post')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindPost {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: { id } }, next) {
    // call next to advance the request
    const post = await Post.find(id)
    if (!post) {
      return response.status(404).json({
        message: 'Post not found.',
        id
      })
    }
    request.post = post

    await next()
  }
}

module.exports = FindPost
