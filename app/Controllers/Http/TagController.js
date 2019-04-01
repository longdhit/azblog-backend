'use strict'

const Tag = use('App/Models/Tag')
const { validateAll } = use('Validator')

class TagController {
    async show({ request, response }) {
        const { tag } = request
        return response.status(200).json({
          message: 'Found your tag.',
          data: tag
        })
      }
    async index() {
        const tags = await Tag.all()

        return response.status(200).json({
          message: 'Successfully retrieved tags.',
          data: tags
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
        const tag = await Tag.create(data)

        return response.status(201).json({
            message: 'Successfully created a new tag.',
            data: tag
          })
    }
    async update ({ request, response }) {
        const data = request.only(['name', 'description'])
        const { tag } = request
        tag.merge(data)
        await tag.save()
    
        response.status(200).json({
            message: 'Successfully updated this tag.',
            data: tag
          })
      }
    
      async delete ({ request, response }) {
        const { tag } = request
        await tag.delete()
    
        return response.status(200).json({
            message: 'Successfully deleted this tag.',
            deleted: true
          })
      }
}

module.exports = TagController
