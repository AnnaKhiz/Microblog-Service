const router = require('express').Router();
const { getPosts, getPostsId, addNewPost, deleteOnePost } = require('../services/apiPosts.js');


router.get('/', getPosts);

router.get('/:id', getPostsId);

router.post('/', addNewPost);

router.delete('/:id', deleteOnePost);

module.exports = { router }

