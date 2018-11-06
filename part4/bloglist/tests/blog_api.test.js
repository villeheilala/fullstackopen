const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, blogsInDb } = require('./test_helper')

describe('When there is initially some blogs saved', async () => {

	beforeAll(async () => {
		await Blog.deleteMany({})

		for (let blog of initialBlogs) {
			let blogObject = new Blog(blog)
			await blogObject.save()
		}
	})


	test('All blogs are returned as json by GET /api/blogs', async () => {
		const blogsInDatabase = await blogsInDb()

		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(response.body.length).toBe(blogsInDatabase.length)

		const returnedTitles = response.body.map(r => r.title)
		blogsInDatabase.forEach(blog => {
			expect(returnedTitles).toContain(blog.title)
		})
	})

	test('Individual blogs are returned as json by GET /api/blogs/:id', async () => {
		const blogsInDatabase = await blogsInDb()
		const aBlog = blogsInDatabase[0]

		const response = await api
			.get(`/api/blogs/${aBlog.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(response.body.title).toBe(aBlog.title)
	})

	test('400 is returned by GET /api/blogs/:id with invalid id', async () => {
		const invalidId = '5a3d5da59070081a82a3445'

		const response = await api
			.get(`/api/blogs/${invalidId}`)
			.expect(400)
	})

	describe('Addition of new blog', async () => {


		test('POST /api/blogs succeeds with valid data', async () => {
			const blogsAtStart = await blogsInDb()

			const newBlog = {
				title: "Winter has come",
				author: "John Snow",
				url: "https://www.winterfell.org/snow",
				likes: 12000
			}

			const response1 = await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			delete response1.body.id
			expect(response1.body).toEqual(newBlog)

			const response2 = await api.get('/api/blogs/')

			expect(response2.body.length).toBe(initialBlogs.length + 1)
			expect(response2.body.map(r => r.title)).toContain(newBlog.title)
		})

		test('Set likes to 0 when likes is not set', async () => {
			const response = await api
				.post('/api/blogs')
				.send({
					title: "Winter has come",
					author: "John Snow",
					url: "https://www.winterfell.org/snow"
				})
				.expect(201)

			expect(response.body.likes).toBe(0)
		})

		test('Title, url and author needs to be set', async () => {
			await api
				.post('/api/blogs')
				.send({
					author: 'John Snow',
					url: 'https://www.winterfell.org/snow'
				})
				.expect(400)

			await api
				.post('/api/blogs')
				.send({
					title: 'Winter has come',
					url: 'https://www.winterfell.org/snow'
				})
				.expect(400)

			await api
				.post('/api/blogs')
				.send({
					title: 'Winter has come',
					author: 'John Snow',
				})
				.expect(400)
		})


	})

	afterAll(() => {
		server.close()
	})

})
