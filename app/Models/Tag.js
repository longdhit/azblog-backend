'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
    posts() {
        return this.belongsToMany('App/Models/Post')
      }
      static boot() {
        super.boot()
    
        this.addTrait('@provider:Lucid/Slugify', {
          fields: { slug: 'name' },
          strategy: 'dbIncrement',
          disableUpdates: true
        })
      }
}

module.exports = Tag
