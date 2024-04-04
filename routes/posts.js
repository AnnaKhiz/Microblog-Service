const router = require('express').Router();
const { getPosts, getPostsByAuthorId, addNewPost, deleteOnePost, updateOnePost } = require('../services/apiPosts.js');
const { parserJwt } = require('../middleware/auth.js');
const { protectedRoute } = require('../middleware/route.js');

router.get('/', parserJwt, protectedRoute(['user', 'unsigned'], '/auth/login'), getPosts);

router.get('/:id', parserJwt, protectedRoute(['user', 'admin'], '/auth/login'), getPostsByAuthorId);

router.post('/', parserJwt, protectedRoute(['user'], '/auth/login'), addNewPost);

router.patch('/:id', parserJwt, protectedRoute(['user'], '/auth/login'), updateOnePost);

router.delete('/:id', parserJwt, protectedRoute(['user', 'admin'], '/auth/login'), deleteOnePost);

module.exports = { router };

