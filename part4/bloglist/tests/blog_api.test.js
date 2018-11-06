const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0
	}
]

beforeAll(async () => {
	await Blog.deleteMany({})

	for (let blog of initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})


describe('GET tests', () => {
	test('Blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('There are six blogs', async () => {
		const response = await api
			.get('/api/blogs')

		expect(response.body.length).toBe(initialBlogs.length)
	})

	test('A specific blog title is within the returned blogs', async () => {
		const response = await api
			.get('/api/blogs')

		expect(response.body.map(r => r.title)).toContain('Type wars')
	})
})

describe('POST tests', () => {

	test('Posted blog is saved and returned as json', async () => {
		const newBlog = {
			title: "Winter has come",
			author: "John Snow",
			url: "https://www.winterfell.org/snow",
			likes: 12000
		}
		
		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		delete response.body.id
		expect(response.body).toEqual(newBlog)
	})

	test('Collection length is increased by one', async () => {
		const response = await api.get('/api/blogs/')
		
		expect(response.body.length).toBe(initialBlogs.length + 1)
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
