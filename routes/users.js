const router = require('express').Router();
const { deleteOneUser } = require('../services/apiUsers.js');
const { protectedRoute } = require('../middleware/route');
const { parserJwt } = require('../middleware/auth');

router.delete('/:id', parserJwt, protectedRoute(['admin'], '/auth/login'), deleteOneUser);

module.exports = { router };