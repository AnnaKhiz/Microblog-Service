const router = require('express').Router();
const { addComment, deleteComment } = require('../services/apiComments.js');

router.post('/', addComment);
router.delete('/:date', deleteComment);

module.exports = { router }