const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
	return {
		id: blog._id,
		title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes
	}
}

blogsRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

blogsRouter.post('/', async (request, response) => {
	try {
		const body = request.body

		if (body.title === undefined || body.author === undefined || body.url === undefined) {
			return response.status(400).json({ error: 'Bad request: title is  missing.' })
		}

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes || 0
		})

		const savedBlog = await blog.save()
		response.status(201).json(formatBlog(savedBlog))
	} catch (exception) {
		console.log(exception)
		response.status(500).json({ error: 'error happened...' })
	}
})

module.exports = blogsRouter
