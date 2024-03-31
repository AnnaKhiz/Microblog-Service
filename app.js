require('dotenv').config();
const { port } = require('config');

const { router: pageRouter } = require('./routes/pages.js');
const { router: contentRouter } = require('./routes/content.js');
const { router: userRouter } = require('./routes/users.js');
const { router: commentsRouter } = require('./routes/comments.js');

const express = require('express');
const server = express();

const cookieParser = require('cookie-parser');

server.listen(port, () => console.log(`Server started on port ${port}`));
server.use(cookieParser());

const jsonBodyParser = express.json();
server.use(jsonBodyParser);

server.use('/public', express.static('static'));
server.set('view engine', 'pug');

server.use(express.urlencoded({ extended: true }));

server.use('/api/users', userRouter);
server.use('/api/posts', contentRouter);
server.use('/api/comments', commentsRouter);
server.use('/', pageRouter);





