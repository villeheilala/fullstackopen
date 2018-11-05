const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	return blogs.reduce((favoriteBlog, blog) => favoriteBlog.likes > blog.likes ? favoriteBlog : blog, {})
}

const mostBlogs = (blogs) => {
	const counts = blogs.map(blog => blog["author"]).reduce( (acc, cur) => (acc[cur] = ++acc[cur] || 1, acc), {} )
	const mostValue = Math.max(...Object.values(counts))
	const mostAuthors = Object.keys(counts).filter(key => counts[key] === mostValue)
	return { author: mostAuthors, blogs: mostValue }
}

const mostLikes = (blogs) => {
	const likes = blogs.reduce( (acc, cur) => (acc[cur["author"]] = acc[cur["author"]] + cur["likes"] || cur["likes"], acc), {})
	const mostValue = Math.max(...Object.values(likes))
	const mostAuthors = Object.keys(likes).filter(key => likes[key] === mostValue)
	return {author: mostAuthors, likes: mostValue}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
