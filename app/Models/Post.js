'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    static boot() {
        super.boot()
    
        this.addTrait('@provider:Lucid/Slugify', {
          fields: { slug: 'title' },
          strategy: 'dbIncrement',
          disableUpdates: true
        })
      }
    tags(){
      return this.belongsToMany('App/Models/Tag')
    }  
    categories() {
        return this.belongsToMany('App/Models/Category')
    }
    author() {
        return this.belongsTo('App/Models/User')
    }
    comments() {
      return this.hasMany('App/Models/Comment')
    }
}

module.exports = Post