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

blogsRouter.get('/:id', async (request, response) => {
	try {
		const foundBlog = await Blog.findById(request.params.id)
		if (foundBlog || foundBlog !== undefined) {
			response.status(200).json(formatBlog(foundBlog))
		} else {
			response.status(404).end()
		}
	} catch (exception) {
		return response.status(400).json({ error: 'Bad request' })
	}
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

module.exports = blogsRouter
