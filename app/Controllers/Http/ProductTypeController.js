'use strict'

const ProductType = use('App/Models/ProductType')
const { validateAll } = use('Validator')

class ProductTypeController {
    async show({ request, response }) {
        const { product_type } = request
        return response.status(200).json({
          message: 'Found your product type.',
          data: product_type
        })
      }
    async index() {
        const product_types = await ProductType.all()

        return response.status(200).json({
          message: 'Successfully retrieved product types.',
          data: product_types
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
        const product_type = await ProductType.create(data)

        return response.status(201).json({
            message: 'Successfully created a new product type.',
            data: product_type
          })
    }
    async update ({ request, response }) {
        const data = request.only(['name', 'description'])
        const { product_type } = request
        product_type.merge(data)
        await product_type.save()
    
        response.status(200).json({
            message: 'Successfully updated this product type.',
            data: product_type
          })
      }
    
      async delete ({ request, response }) {
        const { product_type } = request
        await product_type.delete()
    
        return response.status(200).json({
            message: 'Successfully deleted this product type.',
            deleted: true
          })
      }
}

module.exports = ProductTypeController
