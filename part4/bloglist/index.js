const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

if ( process.env.NODE_ENV !== 'production' ) {
	  require('dotenv').config()
}

mongoose
	.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
	.then(() => {
		console.log('Connectedc to database ', process.env.MONGODB_URI)
	})
	.catch(err => {
		console.log(err)
	})

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
