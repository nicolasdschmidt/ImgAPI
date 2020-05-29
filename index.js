const express = require('express')
const bodyParser = require('body-parser')
const randomString = require('randomstring')
const fs = require('fs')

const app = express()
const port = 80

app.use(express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.sendStatus(200)
})

app.post('/upload', (req, res) => {
	try {
		let base64 = req.body.image
		let now = new Date()

		let y = now.getFullYear()
		let m = now.getMonth() < 10 ? '0' + now.getMonth() : now.getMonth()
		let d = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()

		let disc = randomString.generate(7)

		let name = y + m + d + '_' + disc

		while (fs.existsSync('uploads/' + name + '.jpg')) {
			now = new Date()

			y = now.getFullYear()
			m = now.getMonth() < 10 ? '0' + now.getMonth() : now.getMonth()
			d = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()

			disc = randomString.generate(7)

			name = y + m + d + '_' + disc
		}

		fs.writeFileSync('uploads/' + name + '.jpg', base64, 'base64')

		console.log('new upload: ' + name)
		res.status(200).send(name + '.jpg')
	} catch (error) {
		console.error(error)
		res.sendStatus(500)
	}
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
