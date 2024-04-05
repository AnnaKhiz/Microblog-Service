const router = require('express').Router();
const { addComment, deleteComment } = require('../services/apiComments.js');
const { parserJwt } = require('../middleware/auth');
const { protectedRoute } = require('../middleware/route');
const { validateCommentId } = require('../middleware/validation');

router.post('/', parserJwt, protectedRoute(['user'], '/auth/login'), addComment);

router.delete('/:id', parserJwt, protectedRoute(['user', 'admin'], '/auth/login'), validateCommentId, deleteComment);

module.exports = { router };