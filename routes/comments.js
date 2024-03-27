const router = require('express').Router();
const { addComment, deleteComment, getComments } = require('../services/apiComments.js')

router.get('/', getComments);
router.post('/', addComment);
router.delete('/:date', deleteComment);

module.exports = { router }