'use strict'
const User = use('App/Models/User')
const { validateAll } = use('Validator')

class UserController {
    async register ({ auth, request, response }) {
    const data = request.only(['email', 'password'])
    const validation = await validateAll(data, {
      email: 'required|email|unique:users',
      password: 'required',
    })

    if (validation.fails()) {
        return response.status(400).json({message: validation.messages()})
    }
    await User.create(data)
    const token = await auth.attempt(data.email, data.password)
    return response.json({token})
  }
  async user ({ auth, request, response }) {
    const user = await auth.getUser();
    return response.json({id: user.id, email:user.email, role: user.role})
  }
  async login ({ auth, request, response }) {
    const data = request.only(['email', 'password'])
    const token = await auth.attempt(data.email, data.password)
    return response.json({token})
  }
}

module.exports = UserController
