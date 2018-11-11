const mongoose = require('mongoose')
const Blog = require('./blog')

const userSchema = new mongoose.Schema({
	username: String,
	name: String,
	passwordHash: String,
	adult: Boolean,
	blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => {
	return {
		id: user.id,
		username: user.username,
		name: user.name,
		adult: user.adult,
		blogs: user.blogs.map(blog => Blog.format(blog))
	}
}
		
const User = mongoose.model('User', userSchema)

module.exports = User
