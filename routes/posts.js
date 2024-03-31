const router = require('express').Router();
const { getPosts, getPostsByAuthorId, addNewPost, deleteOnePost, updateOnePost } = require('../services/apiPosts.js');
const { parserJwt } = require('../middleware/auth.js');


router.get('/', parserJwt, getPosts);

router.get('/:id', parserJwt, getPostsByAuthorId);

router.post('/', parserJwt, addNewPost);

router.patch('/:id', updateOnePost);

router.delete('/:id', parserJwt, deleteOnePost);

module.exports = { router };
