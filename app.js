require('dotenv').config();
const sass = require('./utils/sass.js')
const { router: pageRouter } = require('./routes/pages.js');
const { router: contentRouter } = require('./routes/content.js');
const { router: userRouter } = require('./routes/users.js');

const express = require('express');
const server = express();

const { PORT } = require('./config/default');


server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const jsonBodyParser = express.json();
server.use(jsonBodyParser);


server.use('/public', express.static('static'));
server.set('view engine', 'pug');

// server.get('/', (req, res) => {
// 	res.render('index', {id, posts})
// })
// server.use(express.urlencoded({ extended: true }));
server.use('/', pageRouter);

server.use('/api/users', userRouter);
server.use('/api/posts', contentRouter);



