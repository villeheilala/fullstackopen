const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

//const formatBlog = (blog) => {
//return {
//	id: blog._id,
//	title: blog.title,
//	author: blog.author,
//	url: blog.url,
//	likes: blog.likes
//}
//}

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1 })
	response.json(blogs.map(Blog.format))
})

blogsRouter.get('/:id', async (request, response) => {
	try {
		const foundBlog = await Blog.findById(request.params.id)
		if (foundBlog || foundBlog !== undefined) {
			response.status(200).json(Blog.format(foundBlog))
		} else {
			response.status(404).end()
		}
	} catch (exception) {
		return response.status(400).json({ error: 'Bad request' })
	}
})

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7)
	}
	next()
}

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	
	try {
		//const token = getTokenFrom(request)
		const decodedToken = jwt.verify(request.token, process.env.SECRET)

		if (!request.token || !decodedToken.id) {
			return response.status(401).json({ error: 'Token missing or invalid' })
		}

		if (body.title === undefined || body.author === undefined || body.url === undefined) {
			return response.status(400).json({ error: 'Bad request: title is  missing.' })
		}

		const user = await User.findById(decodedToken.id)

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes || 0,
			user: user._id
		})

		const savedBlog = await blog.save()

		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
		
		response.status(201).json(Blog.format(savedBlog))

	} catch (exception) {
		if (exception.name === 'JsonWebTokenError') {
			response.status(401).json({ error: exception.message })
		} else {
			console.log(exception)
			response.status(500).json({ error: 'error happened...' })
		}
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	try {
		const deletedBlog = await Blog.findOneAndDelete({ _id: request.params.id })
		console.log(deletedBlog)
		if (deletedBlog) {
			response.status(204).end()
		} else {
			response.status(404).end()
		}
	} catch (exception) {
		return response.status(500).json({ error: 'error happened...' })
	}
})

blogsRouter.put('/:id', async (request, response) => {
	try {
		const body = request.body
		console.log(body)
		
		const blog = { 
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes
		}
		
		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		response.json(Blog.format(updatedBlog))

	} catch (exception) {
		console.log(exception)
		reponse.status(500).json({ error: 'this is bad...' })
	}
})

module.exports = blogsRouter
