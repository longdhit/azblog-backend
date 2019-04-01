'use strict'

const Category = use('App/Models/Category')
const { validateAll } = use('Validator')

class CategoryController {
    async show({ request, response }) {
        const { category } = request
        return response.status(200).json({
          message: 'Found your category.',
          data: category
        })
      }
    async index() {
        const categories = await Category.all()

        return response.status(200).json({
          message: 'Successfully retrieved categories.',
          data: categories
        })
    }
    async store({ request, response }) {
        const data = request.only(['name', 'description'])
        const validation = await validateAll(data, {
            name: 'required'
        })
        if (validation.fails()) {
            return response.status(400).json({message: validation.messages()})
        }
        const category = await Category.create(data)

        return response.status(201).json({
            message: 'Successfully created a new category.',
            data: category
          })
    }
    async update ({ request, response }) {
        const data = request.only(['name', 'description'])
        const { category } = request
        category.merge(data)
        await category.save()
    
        response.status(200).json({
            message: 'Successfully updated this category.',
            data: category
          })
      }
    
      async delete ({ request, response }) {
        const { category } = request
        await category.delete()
    
        return response.status(200).json({
            message: 'Successfully deleted this category.',
            deleted: true
          })
      }
}

module.exports = CategoryController
