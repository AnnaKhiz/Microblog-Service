require('dotenv').config();
const sass = require('./utils/sass.js')


const express = require('express');
const server = express();

const { PORT } = require('./config/default');

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
server.use('/public', express.static('static'));
server.set('view engine', 'pug');

server.get('/', (req, res) => {
	res.render('index', {})
})