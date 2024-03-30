const router = require('express').Router();
const { addComment, deleteComment } = require('../services/apiComments.js');
const { parserJwt } = require('../middleware/auth')

router.post('/', parserJwt, addComment);
router.delete('/:id', parserJwt, deleteComment);

module.exports = { router }