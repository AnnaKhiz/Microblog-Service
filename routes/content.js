const router = require('express').Router();
const { getPosts, getPostsId, addNewPost, deleteOnePost, updateOnePost } = require('../services/apiPosts.js');
const { parserJwt } = require('../middleware/auth');


router.get('/', parserJwt, getPosts);

router.get('/:id', parserJwt, getPostsId);

router.post('/', parserJwt, addNewPost);

router.patch('/:id', updateOnePost);

router.delete('/:id', parserJwt, deleteOnePost);

module.exports = { router }

