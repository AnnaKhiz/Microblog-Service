const router = require('express').Router();
const { getPosts, getPostsId, addNewPost, deleteOnePost, updateOnePost } = require('../services/apiPosts.js');


router.get('/', getPosts);

router.get('/:id', getPostsId);

router.post('/', addNewPost);

router.patch('/:id/edit', updateOnePost);

router.delete('/:date', deleteOnePost);

module.exports = { router }

