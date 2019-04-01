'use strict'
const Post = use('App/Models/Post')
const { validateAll } = use('Validator')

class PostController {
  async show({ request, response }) {
    const { post } = request
    const categories = await post.categories().fetch()
    // const comments = await post.comments().fetch()
    // post.comments = comments
    post.categories = categories
    response.status(200).json({
      message: 'Here is your post.',
      data: post
    })
  }
  async index({ response }) {
    const posts = await Post
      .query()
      .with('categories')
      .fetch()
    response.status(200).json({
      message: 'Here are your posts.',
      data: posts
    })
  }
  async store({ auth, request, response }) {
    const user = await auth.getUser();
    const data = request.only(['title', 'content', 'image'])
    data.user_id = user.id;
    const { categories } = request.post();
    const validation = await validateAll(data, {
      title: 'required'
    })
    if (validation.fails()) {
      return response.status(400).json({ message: validation.messages() })
    }
    const post = await Post.create(data)
    if (categories && categories.length > 0) {
      await post.categories().attach(categories)
      post.categories = await post.categories().fetch()
    }
    return response.status(201).json({
      message: 'Successfully created a new post.',
      data: post
    })
  }
  async update({ request, response }) {
    const data = request.only(['title', 'content', 'categories', 'image'])
    const { post } = request
    post.merge({ title: data.title, content: data.content })
    await post.save()
    await post.categories().detach()
    if (data.categories && data.categories.length > 0) {
      await post.categories().attach(data.categories)
      post.categories = await post.categories().fetch()
    }
    return response.status(200).json({
      message: 'Successfully updated this post.',
      data: post
    })
  }

  async delete({ request, response }) {
    const { post } = request
    await post.delete()
    response.status(200).json({
      message: 'Successfully deleted this post.',
      deleted: true
    })
  }
}

module.exports = PostController
