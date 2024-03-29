require('dotenv').config();
const sass = require('./utils/sass.js')
const { router: pageRouter } = require('./routes/pages.js');
const { router: contentRouter } = require('./routes/content.js');
const { router: userRouter } = require('./routes/users.js');
const { router: commentsRouter } = require('./routes/comments.js');
const { parserJwt } = require('./middleware/auth')

const express = require('express');
const server = express();

const { PORT } = require('./config/default');
const cookieParser = require('cookie-parser');

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
server.use(cookieParser());

const jsonBodyParser = express.json();
server.use(jsonBodyParser);

server.use(parserJwt);

server.use('/public', express.static('static'));
server.set('view engine', 'pug');

server.use(express.urlencoded({ extended: true }));


server.use('/api/users', userRouter);
server.use('/api/posts', contentRouter);
server.use('/api/comments', commentsRouter);
server.use('/', pageRouter);





