const listHelper = require('../utils/list_helper')

const listWithZeroBlogs = []

const listWithOneBlog = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	}
]

const listWithManyBlogs = [
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
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	}
]

describe.skip('total likes', () => {

	test('When list has zero blogs the likes equals to zero', () => {
		expect(listHelper.totalLikes(listWithZeroBlogs)).toBe(0)
	})

	test('When list has only one blog equals the likes of that', () => {
		expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
	})

	test('When list has many blogs the likes is the sum of all likes', () => {
		expect(listHelper.totalLikes(listWithManyBlogs)).toBe(41)
	})
})


describe.skip('favorite blog', () => {

	test('The favorite blog of an empty blog list is emtpy object', () => {
		expect(listHelper.favoriteBlog([])).toEqual({})
	})

	test('The favorite blog is the blog which has most likes', () => {
		expect(listHelper.favoriteBlog(listWithManyBlogs)).toEqual(listWithManyBlogs[2])
	})

})

describe.skip('most blogs', () => {

	test('The most blogs writer is a writer who has most blogs in a bloglist', () => {
		expect(listHelper.mostBlogs(listWithManyBlogs.slice(0, -1))).toEqual({ author: ["Robert C. Martin"], blogs: 3 })
	})

	test('If several authors have same amount of blogs return list of author names', () => {
		expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual({ author: [ 'Edsger W. Dijkstra', 'Robert C. Martin' ], blogs: 3 })
	})

})

describe.skip('most likes', () => {

	test('Author which has most likes', () => {
		expect(listHelper.mostLikes(listWithManyBlogs)).toEqual( {"author": ["Edsger W. Dijkstra"], "likes": 22} )
	})

})
