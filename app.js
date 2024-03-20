require('dotenv').config();
const sass = require('./utils/sass.js')
const { router: pageRouter } = require('./routes/pages.js');

const { init } = require('./db')
init()

const express = require('express');
const server = express();

const { PORT } = require('./config/default');

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
server.use('/public', express.static('static'));
server.set('view engine', 'pug');

server.get('/', (req, res) => {
	res.render('index', {})
})

server.use('/', pageRouter);

