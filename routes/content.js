const router = require('express').Router();
const { getPosts, getPostsId, addNewPost, deleteOnePost, updateOnePost } = require('../services/apiPosts.js');

router.get('/', getPosts);

router.get('/:id', getPostsId);

router.post('/', addNewPost);

router.patch('/:id', updateOnePost);

router.delete('/:date', deleteOnePost); //??? чому не по айді? а раптом у двох постів співпаде дата?

module.exports = { router }

