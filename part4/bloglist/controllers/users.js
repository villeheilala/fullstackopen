const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User
		.find({})
		.populate('blogs')

	response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
	try {
		const body = request.body
		
		if (body.username === null || body.password === null) {
			return response.status(400).json({ error: 'Username and/or password missing.'})
		}

		const existingUser = await User.find({ username: body.username })
		if (existingUser.length > 0) {
			return response.status(400).json({ error: 'Duplicate username' })
		}

		if (body.password.length < 4) {
			return response.status(400).json({ error: 'Password too short' })
		}

		const saltRounds = 10
		const passwordHash = await bcrypt.hash(body.password, saltRounds)

		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash,
			adult: body.adult || true
		})

		const savedUser = await user.save()

		response.json(User.format(savedUser))
	} catch (exception) {
		console.log(exception)
		response.status(500).json({ error: 'Something really bad just happened...' })
	}
})

module.exports = usersRouter
