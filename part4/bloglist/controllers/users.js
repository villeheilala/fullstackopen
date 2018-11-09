const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
	try {
		const body = request.body
		
		if (body.username === undefined || body.password === undefined) {
			return response.status(400).json({ error: 'Username and/or password missing.'})
		}

		const saltRounds = 10
		const passwordHash = await bcrypt.hash(body.password, saltRounds)

		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash,
			adult: body.adult
		})

		const savedUser = await user.save()

		response.json(User.format(savedUser))
	} catch (exception) {
		console.log(exception)
		response.status(500).json({ error: 'Something really bad just happened...' })
	}
})

module.exports = usersRouter
